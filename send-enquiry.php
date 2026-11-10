<?php
/**
 * Design & Deploy: enquiry form handler (PHP version, works on every Hostinger web hosting plan)
 *
 * Receives the website form as JSON, validates it, and emails the details to the studio inbox
 * through the Hostinger mailbox (SMTP). Needs PHP 7.4+ (Hostinger offers 8.x) and the PHPMailer folder
 * next to this file. Credentials live in enquiry-config.php, kept OUTSIDE public_html.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond($code, $payload)
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

/* ------------------------------------------------------------------ config */
$cfgFile = null;
foreach ([__DIR__ . '/../enquiry-config.php', __DIR__ . '/enquiry-config.php'] as $candidate) {
    if (is_file($candidate)) { $cfgFile = $candidate; break; }
}
if ($cfgFile === null) {
    error_log('enquiry: enquiry-config.php not found');
    respond(500, ['ok' => false, 'message' => 'The form is not configured yet. Please email us directly.']);
}
$cfg = require $cfgFile;

/* ----------------------------------------------------------------- request */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'message' => 'Method not allowed.']);
}

// Only accept submissions from this site (a request from another website is refused).
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $strip = function ($h) { return preg_replace('/^www\./i', '', strtolower((string)$h)); };
    $originHost = $strip(parse_url($origin, PHP_URL_HOST));
    $selfHost = $strip(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
    $extra = array_map(function ($o) use ($strip) { return $strip(parse_url($o, PHP_URL_HOST)); }, $cfg['extra_origins'] ?? []);
    if ($originHost !== $selfHost && !in_array($originHost, $extra, true)) {
        respond(403, ['ok' => false, 'message' => 'Origin not allowed.']);
    }
}

$raw = file_get_contents('php://input');
if ($raw !== false && strlen($raw) > 20000) {
    respond(413, ['ok' => false, 'message' => 'Request too large.']);
}
$in = json_decode((string)$raw, true);
if (!is_array($in)) { $in = $_POST; }

// Honeypot: real visitors never fill the hidden "website" field, bots usually do.
if (!empty($in['website'])) { respond(200, ['ok' => true]); }

/* -------------------------------------------------------------- rate limit */
$limit = (int)($cfg['rate_limit'] ?? 8);
$window = (int)($cfg['rate_window'] ?? 900);
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = sys_get_temp_dir() . '/dd_enquiry_rl_' . sha1($ip) . '.json';
$fh = @fopen($rlFile, 'c+');
if ($fh) {
    flock($fh, LOCK_EX);
    $hits = json_decode((string)stream_get_contents($fh), true);
    $now = time();
    $hits = array_values(array_filter(is_array($hits) ? $hits : [], function ($t) use ($now, $window) { return $t > $now - $window; }));
    if (count($hits) >= $limit) {
        flock($fh, LOCK_UN); fclose($fh);
        respond(429, ['ok' => false, 'message' => 'Too many requests. Please try again in a few minutes.']);
    }
    $hits[] = $now;
    ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($hits));
    flock($fh, LOCK_UN); fclose($fh);
}

/* -------------------------------------------------------------- validation */
function cut($s, $max) { return function_exists('mb_substr') ? mb_substr($s, 0, $max, 'UTF-8') : substr($s, 0, $max); }
function clean($v, $max) { return cut(trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', is_scalar($v) ? (string)$v : '')), $max); }
function oneLine($v, $max) { return clean(preg_replace('/\s+/u', ' ', clean($v, $max)), $max); }
function esc($s) { return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

$d = [
    'name'     => oneLine($in['name'] ?? '', 100),
    'email'    => strtolower(oneLine($in['email'] ?? '', 254)),
    'service'  => oneLine($in['service'] ?? '', 100),
    'message'  => clean($in['message'] ?? '', 5000),
    'company'  => oneLine($in['company'] ?? '', 150),
    'phone'    => oneLine($in['phone'] ?? '', 40),
    'timeline' => oneLine($in['timeline'] ?? '', 150),
    'budget'   => oneLine($in['budget'] ?? '', 150),
    'source'   => oneLine($in['source'] ?? '', 40) ?: 'website',
];
$errors = [];
$len = function ($s) { return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s); };
if ($len($d['name']) < 2) $errors['name'] = 'Please enter your name.';
if (!filter_var($d['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Please enter a valid email address.';
if ($d['service'] === '') $errors['service'] = 'Please choose a service.';
if ($len($d['message']) < 3) $errors['message'] = 'Please tell us a little about your project.';
if ($errors) {
    respond(400, ['ok' => false, 'message' => reset($errors), 'errors' => $errors]);
}

/* ------------------------------------------------------------------- email */
date_default_timezone_set('Asia/Kolkata');
$time = date('j M Y, g:i a');
$rows = array_filter([
    'Name' => $d['name'], 'Email' => $d['email'], 'Phone' => $d['phone'], 'Company / Brand' => $d['company'],
    'Service' => $d['service'], 'Timeline' => $d['timeline'], 'Budget' => $d['budget'], 'Submitted from' => $d['source'],
], function ($v) { return $v !== ''; });

$text = "New project enquiry\n\n";
foreach ($rows as $k => $v) { $text .= "$k: $v\n"; }
$text .= "\nProject details:\n{$d['message']}\n\n---\nReceived $time (IST) from IP $ip\n";

$trs = '';
foreach ($rows as $k => $v) {
    $trs .= '<tr><td style="padding:8px 16px 8px 0;color:#555;white-space:nowrap;vertical-align:top;font-weight:600">' . esc($k) . '</td>'
          . '<td style="padding:8px 0;color:#000">' . esc($v) . '</td></tr>';
}
$html = '<!doctype html><html><body style="margin:0;padding:24px;background:#F9F5F0;font-family:Arial,Helvetica,sans-serif">'
  . '<div style="max-width:620px;margin:0 auto;background:#fff;border:2px solid #000">'
  . '<div style="background:#000;padding:18px 24px"><span style="color:#FFD600;font-size:20px;font-weight:800">New project enquiry</span></div>'
  . '<div style="padding:24px"><table style="border-collapse:collapse;width:100%;font-size:15px">' . $trs . '</table>'
  . '<p style="margin:24px 0 6px;color:#555;font-weight:600;font-size:15px">Project details</p>'
  . '<div style="white-space:pre-wrap;font-size:15px;line-height:1.55;color:#000;background:#F9F5F0;padding:14px 16px;border-left:4px solid #CF0000">' . esc($d['message']) . '</div>'
  . '<p style="margin:24px 0 0;font-size:12px;color:#777">Received ' . esc($time) . ' (IST) from IP ' . esc($ip) . '. Hit reply to answer ' . esc($d['name']) . ' directly.</p>'
  . '</div></div></body></html>';

/* -------------------------------------------------------------------- send */
require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

$mail = new PHPMailer\PHPMailer\PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = $cfg['smtp_host'];
    $mail->Port = (int)$cfg['smtp_port'];
    $mail->SMTPAuth = $cfg['smtp_auth'] ?? true;
    $mail->Username = $cfg['smtp_user'];
    $mail->Password = $cfg['smtp_pass'];
    $secure = $cfg['smtp_secure'] ?? 'ssl';                       // 'ssl' = port 465, 'tls' = port 587
    $mail->SMTPSecure = $secure === 'ssl' ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS
                      : ($secure === 'tls' ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS : '');
    $mail->SMTPAutoTLS = $secure !== '';
    $mail->Timeout = 15;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($cfg['mail_from'], $cfg['mail_from_name'] ?? 'Design & Deploy Website');
    $mail->addAddress($cfg['mail_to']);
    $mail->addReplyTo($d['email'], $d['name']);                    // "Reply" in your inbox goes straight to the visitor

    $mail->isHTML(true);
    $mail->Subject = 'New enquiry: ' . $d['service'] . ' - ' . $d['name'];
    $mail->Body = $html;
    $mail->AltBody = $text;
    $mail->send();

    respond(200, ['ok' => true]);
} catch (Throwable $e) {
    error_log('enquiry: mail send failed: ' . $e->getMessage());
    respond(500, ['ok' => false, 'message' => 'We could not send your enquiry right now. Please email us directly.']);
}
