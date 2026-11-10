<?php
/**
 * Copy this file to  enquiry-config.php  and put it ONE FOLDER ABOVE public_html
 * (e.g. .../domains/yourdomain/enquiry-config.php), so it can never be opened from the browser.
 */
return [
    // Hostinger mailbox that sends the mail (full address + that mailbox's password)
    'smtp_host'   => 'smtp.hostinger.com',
    'smtp_port'   => 465,
    'smtp_secure' => 'ssl',            // 'ssl' for port 465.  If that fails use port 587 with 'tls'
    'smtp_auth'   => true,
    'smtp_user'   => 'support@designandeploy.in',
    'smtp_pass'   => 'D&d21102026',

    // Hostinger only lets a mailbox send as itself, so mail_from must equal smtp_user
    'mail_from'      => 'support@designandeploy.in',
    'mail_from_name' => 'Design & Deploy Website',

    // Where enquiries are delivered
    'mail_to' => 'support@designandeploy.in',

    // Anti-spam: max submissions per visitor IP per window (seconds)
    'rate_limit'  => 8,
    'rate_window' => 900,

    // Optional: other websites allowed to post here (the site this file runs on is always allowed)
    'extra_origins' => [],
];
