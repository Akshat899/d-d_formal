'use strict';

/**
 * Design & Deploy: enquiry backend
 * POST /api/enquiry  (JSON)  ->  emails the form details to MAIL_TO
 */

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const {
  PORT = 3000,
  ALLOWED_ORIGINS = '',
  SMTP_HOST, SMTP_PORT = '465', SMTP_SECURE = 'true', SMTP_USER, SMTP_PASS,
  MAIL_TO, MAIL_FROM,
  DRY_RUN = 'false',
} = process.env;

const dryRun = DRY_RUN === 'true';
if (!dryRun && !(SMTP_HOST && SMTP_USER && SMTP_PASS && MAIL_TO)) {
  console.error('Missing SMTP_HOST, SMTP_USER, SMTP_PASS or MAIL_TO. Copy .env.example to .env and fill it in.');
  process.exit(1);
}
const mailTo = MAIL_TO || 'test@example.com';

const transporter = dryRun
  ? nodemailer.createTransport({ jsonTransport: true })
  : nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

/* ------------------------------------------------------------------ helpers */
const clean = (v, max) =>
  String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/\s+/g, ' ');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(body = {}) {
  const d = {
    name: oneLine(body.name, 100),
    email: oneLine(body.email, 254).toLowerCase(),
    service: oneLine(body.service, 100),
    message: clean(body.message, 5000),
    company: oneLine(body.company, 150),
    phone: oneLine(body.phone, 40),
    timeline: oneLine(body.timeline, 150),
    budget: oneLine(body.budget, 150),
    source: oneLine(body.source, 40) || 'website',
  };
  const errors = {};
  if (d.name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(d.email)) errors.email = 'Please enter a valid email address.';
  if (!d.service) errors.service = 'Please choose a service.';
  if (d.message.length < 3) errors.message = 'Please tell us a little about your project.';
  return { d, errors };
}

function buildEmail(d, meta) {
  const rows = [
    ['Name', d.name],
    ['Email', d.email],
    ['Phone', d.phone],
    ['Company / Brand', d.company],
    ['Service', d.service],
    ['Timeline', d.timeline],
    ['Budget', d.budget],
    ['Submitted from', d.source],
  ].filter(([, v]) => v);

  const text =
    'New project enquiry\n\n' +
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
    `\n\nProject details:\n${d.message}\n\n---\nReceived ${meta.time} (IST) from IP ${meta.ip}\n`;

  const tr = ([k, v]) =>
    `<tr><td style="padding:8px 16px 8px 0;color:#555;white-space:nowrap;vertical-align:top;font-weight:600">${esc(k)}</td>` +
    `<td style="padding:8px 0;color:#000">${esc(v)}</td></tr>`;

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#F9F5F0;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:620px;margin:0 auto;background:#fff;border:2px solid #000">
    <div style="background:#000;padding:18px 24px">
      <span style="color:#FFD600;font-size:20px;font-weight:800">New project enquiry</span>
    </div>
    <div style="padding:24px">
      <table style="border-collapse:collapse;width:100%;font-size:15px">${rows.map(tr).join('')}</table>
      <p style="margin:24px 0 6px;color:#555;font-weight:600;font-size:15px">Project details</p>
      <div style="white-space:pre-wrap;font-size:15px;line-height:1.55;color:#000;background:#F9F5F0;padding:14px 16px;border-left:4px solid #CF0000">${esc(d.message)}</div>
      <p style="margin:24px 0 0;font-size:12px;color:#777">Received ${esc(meta.time)} (IST) from IP ${esc(meta.ip)}. Hit reply to answer ${esc(d.name)} directly.</p>
    </div>
  </div></body></html>`;

  return { text, html };
}

/* ---------------------------------------------------------------------- app */
const app = express();
app.set('trust proxy', 1);            // behind Render / Railway / Nginx etc., so rate limiting sees the real IP
app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

const origins = ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin(origin, cb) {
    if (!origin || origins.includes(origin)) return cb(null, true);   // no Origin header = curl/server-to-server
    cb(new Error('Origin not allowed'));
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 86400,
}));

app.use(express.json({ limit: '20kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,                           // 5 enquiries per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: 'Too many requests. Please try again in a few minutes.' },
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/enquiry', limiter, async (req, res) => {
  // Honeypot: real visitors never see or fill the hidden "website" field, bots usually do.
  if (req.body && req.body.website) return res.json({ ok: true });

  const { d, errors } = validate(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, message: Object.values(errors)[0], errors });

  const meta = {
    ip: req.ip,
    time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }),
  };
  const { text, html } = buildEmail(d, meta);

  try {
    const info = await transporter.sendMail({
      from: MAIL_FROM || SMTP_USER || mailTo,
      to: mailTo,
      replyTo: { name: d.name, address: d.email },   // "Reply" in your inbox goes straight to the visitor
      subject: `New enquiry: ${d.service} - ${d.name}`,
      text,
      html,
    });
    if (dryRun) console.log('[DRY RUN] would send:\n' + JSON.stringify(JSON.parse(info.message), null, 2));
    return res.json({ ok: true });
  } catch (err) {
    console.error('Mail send failed:', err.message);
    return res.status(500).json({ ok: false, message: 'We could not send your enquiry right now. Please email us directly.' });
  }
});

// JSON parse errors, CORS rejections, anything unexpected
app.use((err, _req, res, _next) => {
  if (err && err.message === 'Origin not allowed') return res.status(403).json({ ok: false, message: 'Origin not allowed.' });
  if (err && err.type === 'entity.parse.failed') return res.status(400).json({ ok: false, message: 'Invalid JSON.' });
  console.error(err);
  res.status(500).json({ ok: false, message: 'Something went wrong.' });
});

app.listen(PORT, () => {
  console.log(`Enquiry API listening on :${PORT}${dryRun ? ' (DRY RUN, no mail will be sent)' : ''}`);
  if (!dryRun) {
    transporter.verify()
      .then(() => console.log('SMTP connection OK'))
      .catch(e => console.warn('SMTP check failed:', e.message));
  }
});
