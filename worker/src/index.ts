/**
 * CycleBuddy forms Worker
 * -----------------------
 * Receives the website's three forms and passes them to Resend:
 *   POST /waitlist  { email, language, country?, website? }  -> saves contact + sends a confirmation email
 *   POST /contact   { name, email, message, language?, website? } -> emails hello@cyclebuddy.ca (reply-to = visitor)
 *   POST /partner   { name, institution, email, message, language?, website? } -> emails "Research partnership"
 *
 * Accepts JSON (the site's JavaScript) or a normal HTML form post (no JavaScript: answers with a small page).
 * Privacy: nothing is stored here. The visitor's IP is only used as a short-lived rate-limit key and is never
 * logged. Logs contain status codes only, never names, emails or messages.
 */

export interface Env {
  RESEND_API_KEY: string; // secret: `npx wrangler secret put RESEND_API_KEY`
  TURNSTILE_SECRET?: string; // secret: Cloudflare Turnstile. When set, every submission must pass the "not a robot" check.
  RESEND_SEGMENT_ID?: string; // optional: Resend segment ("list") for the waitlist
  ALLOWED_ORIGINS: string; // comma-separated
  TO_EMAIL: string;
  FROM_EMAIL: string;
  SITE_URL: string;
  LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> };
}

type Kind = 'waitlist' | 'contact' | 'partner';
type Lang = 'en' | 'es' | 'fr';
const KINDS: Kind[] = ['waitlist', 'contact', 'partner'];
const LANGS: Lang[] = ['en', 'es', 'fr'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UA = 'cyclebuddy-forms/1.0';

// ---------- small helpers ----------
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const json = (body: unknown, status: number, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers } });

function corsHeaders(req: Request, env: Env): Record<string, string> {
  const origin = req.headers.get('Origin') ?? '';
  const allowed = env.ALLOWED_ORIGINS.split(',').map((s) => s.trim());
  if (!allowed.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

// In-memory fallback limiter (per Worker instance) in case the rate-limit binding isn't configured.
const memory = new Map<string, { n: number; t: number }>();
async function allowed(env: Env, ip: string): Promise<boolean> {
  if (env.LIMITER) return (await env.LIMITER.limit({ key: ip })).success;
  const now = Date.now();
  const e = memory.get(ip);
  if (!e || now - e.t > 60_000) { memory.set(ip, { n: 1, t: now }); return true; }
  e.n += 1;
  return e.n <= 5;
}

async function resend(env: Env, path: string, body: unknown): Promise<Response> {
  return fetch(`https://api.resend.com${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'User-Agent': UA },
    body: JSON.stringify(body),
  });
}

// ---------- "not a robot" check (Cloudflare Turnstile) ----------
async function human(env: Env, tok: unknown): Promise<boolean> {
  if (typeof tok !== 'string' || !tok || tok.length > 2048) return false;
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': UA },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET, response: tok }),
  });
  if (!r.ok) return false;
  const v = (await r.json()) as { success?: boolean; hostname?: string };
  return v.success === true && (!v.hostname || /(^|\.)cyclebuddyapp\.com$|^localhost$/.test(v.hostname));
}

// ---------- spam checks (no third parties, nothing stored) ----------
const URL_RE = /(https?:\/\/|www\.|\[url|<a\s)/gi;
function spamReason(kind: Kind, raw: Record<string, unknown>, isForm: boolean): string {
  // The site's JavaScript sends how long the form was open (_e, ms) and how many keys/taps happened in it (_h).
  // Plain HTML posts (visitor without JavaScript) don't have them, so they're only checked on JSON posts.
  if (!isForm) {
    const e = Number(raw._e), h = Number(raw._h);
    if (!Number.isFinite(e) || !Number.isFinite(h)) return 'no_signals';
    if (e < 3000) return 'too_fast';
    if (h < 1) return 'no_interaction';
  }
  const text = (k: string) => (typeof raw[k] === 'string' ? (raw[k] as string) : '');
  // People don't put links in their name, institution or country.
  for (const k of ['name', 'institution', 'country']) if (text(k).match(URL_RE)) return 'link_in_field';
  if (kind !== 'waitlist') {
    const msg = text('message');
    if ((msg.match(URL_RE) ?? []).length > 2) return 'too_many_links';
    if (/<\/?[a-z][^>]*>/i.test(msg)) return 'html_in_message';
  }
  return '';
}

// ---------- confirmation email copy (waitlist) ----------
const CONFIRM: Record<Lang, { subject: string; hello: string; body: string; ignore: string; leave: string; sign: string }> = {
  en: {
    subject: 'You’re on the CycleBuddy waitlist',
    hello: 'Thank you for joining!',
    body: 'We’ll write only when there’s something worth your time, like the day CycleBuddy launches this winter.',
    ignore: 'If you didn’t sign up, you can simply ignore this email.',
    leave: 'Unsubscribe',
    sign: 'With care, the CycleBuddy team',
  },
  es: {
    subject: 'Ya estás en la lista de espera de CycleBuddy',
    hello: '¡Gracias por unirte!',
    body: 'Solo te escribiremos cuando valga la pena, como el día en que CycleBuddy llegue este invierno.',
    ignore: 'Si no fuiste tú, simplemente ignora este correo.',
    leave: 'Darme de baja',
    sign: 'Con cariño, el equipo de CycleBuddy',
  },
  fr: {
    subject: 'Tu es sur la liste d’attente de CycleBuddy',
    hello: 'Merci de t’être inscrite!',
    body: 'Nous t’écrirons seulement quand ça en vaudra la peine, comme le jour du lancement de CycleBuddy cet hiver.',
    ignore: 'Si ce n’était pas toi, tu peux simplement ignorer ce courriel.',
    leave: 'Me désabonner',
    sign: 'Avec soin, l’équipe CycleBuddy',
  },
};

function confirmEmail(env: Env, lang: Lang) {
  const c = CONFIRM[lang];
  const unsub = `mailto:${env.TO_EMAIL}?subject=Unsubscribe`;
  const text = `${c.hello}\n\n${c.body}\n\n${c.ignore}\n\n${c.sign}\n${env.SITE_URL}\n\n${c.leave}: ${unsub}`;
  const html = `<!doctype html><html lang="${lang}"><body style="margin:0;background:#F9EEE4;font-family:Inter,Segoe UI,Arial,sans-serif;color:#2B2B2B">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:20px;padding:36px 32px">
<tr><td style="font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#800020;font-weight:bold">CycleBuddy</td></tr>
<tr><td style="padding-top:18px;font-size:20px;color:#800020;font-weight:600">${c.hello}</td></tr>
<tr><td style="padding-top:10px;font-size:16px;line-height:1.6">${c.body}</td></tr>
<tr><td style="padding-top:14px;font-size:14px;line-height:1.6;color:#5E5658">${c.ignore}</td></tr>
<tr><td style="padding-top:22px;font-size:15px;color:#800020;font-style:italic">${c.sign}</td></tr>
<tr><td style="padding-top:22px;font-size:12px;color:#5E5658"><a href="${env.SITE_URL}" style="color:#A8264F">${env.SITE_URL.replace('https://', '')}</a> · <a href="${unsub}" style="color:#5E5658">${c.leave}</a></td></tr>
</table></td></tr></table></body></html>`;
  return { subject: c.subject, text, html, unsub };
}

// ---------- the three handlers ----------
async function handleWaitlist(env: Env, d: Record<string, string>, lang: Lang): Promise<'ok' | 'error'> {
  const email = d.email;
  const country = clean(d.country, 80);
  const base: Record<string, unknown> = { email, unsubscribed: false };
  if (env.RESEND_SEGMENT_ID) base.segments = [{ id: env.RESEND_SEGMENT_ID }];

  // Try to save language/country as contact properties; if Resend refuses them, save the email alone.
  let r = await resend(env, '/contacts', { ...base, properties: { language: lang, ...(country ? { country } : {}) } });
  if (r.status === 400 || r.status === 422) {
    const txt = await r.text();
    if (!/exist/i.test(txt)) r = await resend(env, '/contacts', base);
    else r = new Response(null, { status: 200 }); // already on the list: fine
  }
  const saved = r.ok || r.status === 409;
  if (!saved) {
    console.error('waitlist contact failed', r.status);
    // Never lose a sign-up: notify the team inbox instead.
    const n = await resend(env, '/emails', {
      from: env.FROM_EMAIL, to: [env.TO_EMAIL], subject: 'Waitlist sign-up (contact save failed)',
      text: `Email: ${email}\nLanguage: ${lang}\nCountry: ${country || '-'}\n\nResend could not save this contact (status ${r.status}). Please add it manually.`,
    });
    if (!n.ok) return 'error';
  }

  const c = confirmEmail(env, lang);
  const s = await resend(env, '/emails', {
    from: env.FROM_EMAIL, to: [email], reply_to: env.TO_EMAIL, subject: c.subject, text: c.text, html: c.html,
    headers: { 'List-Unsubscribe': `<${c.unsub}>` },
  });
  if (!s.ok) console.error('waitlist confirmation failed', s.status);
  return 'ok'; // the sign-up is saved even if the confirmation email failed
}

async function handleMessage(env: Env, kind: 'contact' | 'partner', d: Record<string, string>, lang: Lang): Promise<'ok' | 'error'> {
  const lines = [
    `Name: ${d.name}`,
    kind === 'partner' ? `Institution: ${d.institution}` : '',
    `Email: ${d.email}`,
    `Language: ${lang}`,
    '',
    d.message,
    '',
    `Sent from the ${kind === 'partner' ? 'research partner' : 'contact'} form on ${env.SITE_URL}`,
  ].filter((l, i) => l !== '' || i > 3);
  const subject = kind === 'partner' ? 'Research partnership' : `Website message from ${d.name}`;
  const r = await resend(env, '/emails', { from: env.FROM_EMAIL, to: [env.TO_EMAIL], reply_to: d.email, subject, text: lines.join('\n') });
  if (!r.ok) { console.error(`${kind} email failed`, r.status); return 'error'; }
  return 'ok';
}

// ---------- page shown to visitors without JavaScript ----------
const PAGE: Record<Lang, { ok: string; okWait: string; err: string; bad: string; rate: string; back: string }> = {
  en: { ok: 'Thanks, your message is on its way. We’ll reply by email.', okWait: 'You’re on the list. Check your inbox for a short confirmation.', err: 'Something went wrong. Please try again, or email hello@cyclebuddy.ca.', bad: 'Please go back and check the form: a field is missing or the email address isn’t valid.', rate: 'Too many attempts. Please wait a few minutes and try again.', back: 'Back to CycleBuddy' },
  es: { ok: 'Gracias, tu mensaje va en camino. Te responderemos por correo.', okWait: 'Ya estás en la lista. Revisa tu correo: te enviamos una breve confirmación.', err: 'Algo salió mal. Inténtalo de nuevo o escríbenos a hello@cyclebuddy.ca.', bad: 'Vuelve y revisa el formulario: falta un campo o el correo no es válido.', rate: 'Demasiados intentos. Espera unos minutos y vuelve a intentarlo.', back: 'Volver a CycleBuddy' },
  fr: { ok: 'Merci, ton message est en route. Nous te répondrons par courriel.', okWait: 'C’est fait, tu es sur la liste! Un court courriel de confirmation t’attend.', err: 'Un problème est survenu. Réessaie, ou écris-nous à hello@cyclebuddy.ca.', bad: 'Reviens en arrière et vérifie le formulaire : un champ manque ou le courriel n’est pas valide.', rate: 'Trop de tentatives. Attends quelques minutes, puis réessaie.', back: 'Retour à CycleBuddy' },
};

function htmlPage(env: Env, lang: Lang, message: string, back: string, status: number) {
  const body = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>CycleBuddy</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F9EEE4;font-family:Inter,system-ui,sans-serif;color:#2B2B2B;padding:16px}main{max-width:480px;background:#fff;border-radius:24px;padding:36px 30px;text-align:center;box-shadow:0 18px 44px -24px rgba(128,0,32,.32)}h1{font-family:Georgia,serif;color:#800020;margin:0 0 12px}a{display:inline-block;margin-top:20px;background:#800020;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:600}</style></head>
<body><main><h1>CycleBuddy</h1><p>${message}</p><a href="${back}">${PAGE[lang].back}</a></main></body></html>`;
  return new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

// ---------- main ----------
export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const cors = corsHeaders(req, env);

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method === 'GET' && url.pathname === '/') return json({ ok: true }, 200);

    const kind = url.pathname.replace(/^\/+|\/+$/g, '') as Kind;
    if (req.method !== 'POST' || !KINDS.includes(kind)) return json({ ok: false, error: 'not_found' }, 404, cors);

    // Browsers always send an Origin header with a POST. Only accept posts made from our own website;
    // scripts posting straight to this address (no Origin, or another site's) are refused.
    if (!cors['Access-Control-Allow-Origin']) { console.log('blocked: origin'); return json({ ok: false, error: 'origin_not_allowed' }, 403); }

    // Read JSON or a normal form post
    const type = req.headers.get('Content-Type') ?? '';
    const isForm = type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data');
    let raw: Record<string, unknown> = {};
    try {
      raw = isForm ? Object.fromEntries((await req.formData()).entries()) : await req.json();
    } catch {
      return json({ ok: false, error: 'invalid_body' }, 400, cors);
    }

    const lang: Lang = LANGS.includes(raw.language as Lang) ? (raw.language as Lang) : 'en';
    const siteBack = `${env.SITE_URL}${lang === 'en' ? '/' : `/${lang}/`}`;
    const back = typeof raw.redirect === 'string' && raw.redirect.startsWith('/') && !raw.redirect.startsWith('//') ? `${env.SITE_URL}${raw.redirect}` : siteBack;
    const reply = (status: number, error?: string, fields?: string[]) => {
      if (isForm) {
        const p = PAGE[lang];
        const msg = status === 200 ? (kind === 'waitlist' ? p.okWait : p.ok) : status === 429 ? p.rate : status === 400 ? p.bad : p.err;
        return htmlPage(env, lang, msg, back, status);
      }
      return json(status === 200 ? { ok: true } : { ok: false, error, ...(fields ? { fields } : {}) }, status, cors);
    };

    // Honeypot: people never see this field. If it's filled, pretend all is well and drop it.
    if (clean(raw.website, 200)) { console.log('dropped: honeypot'); return reply(200); }

    // Bot checks. Spam gets a normal "thanks" so bots can't learn what tripped them, but nothing is sent.
    const spam = spamReason(kind, raw, isForm);
    if (spam) { console.log(`dropped: ${spam}`); return reply(200); }

    // "Not a robot" check, once the Turnstile secret is configured. Needs JavaScript, like most of the web.
    if (env.TURNSTILE_SECRET && !(await human(env, raw['cf-turnstile-response']))) {
      console.log('blocked: turnstile');
      return reply(403, 'verification_failed');
    }

    // Rate limit: 5 submissions per minute per IP (IP is used only as the counter key, never stored or logged)
    const ip = req.headers.get('CF-Connecting-IP') ?? 'unknown';
    if (!(await allowed(env, ip))) return reply(429, 'rate_limited');

    // Validate
    const d: Record<string, string> = {
      email: clean(raw.email, 254),
      name: clean(raw.name, 120),
      institution: clean(raw.institution, 160),
      message: clean(raw.message, 5000),
      country: clean(raw.country, 80),
    };
    const required = kind === 'waitlist' ? ['email'] : kind === 'contact' ? ['name', 'email', 'message'] : ['name', 'institution', 'email', 'message'];
    const bad = required.filter((f) => !d[f]);
    if (d.email && !EMAIL_RE.test(d.email)) bad.push('email');
    if (bad.length) return reply(400, 'invalid_fields', [...new Set(bad)]);

    if (!env.RESEND_API_KEY) { console.error('RESEND_API_KEY missing'); return reply(500, 'not_configured'); }

    try {
      const result = kind === 'waitlist' ? await handleWaitlist(env, d, lang) : await handleMessage(env, kind, d, lang);
      return result === 'ok' ? reply(200) : reply(502, 'send_failed');
    } catch {
      console.error('unexpected error', kind);
      return reply(500, 'server_error');
    }
  },
};
