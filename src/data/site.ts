// Site-wide constants. Change values here, not in components.
export const SITE = {
  name: 'CycleBuddy',
  url: 'https://cyclebuddyapp.com',
  email: 'hello@cyclebuddy.ca',
  location: 'Ontario, Canada',
};

// Cloudflare Worker that receives the forms (see /worker and SETUP.md).
// The deployed Worker address. PUBLIC_FORMS_ENDPOINT (GitHub Actions variable or local .env) overrides it.
// Cloudflare Turnstile (the "not a robot" check). The site key is public by design; the secret lives only in the Worker.
// Empty = no check (the Worker only enforces it once TURNSTILE_SECRET is set).
export const TURNSTILE_SITEKEY: string = import.meta.env.PUBLIC_TURNSTILE_SITEKEY || '';

export const FORMS_ENDPOINT: string = import.meta.env.PUBLIC_FORMS_ENDPOINT || 'https://cyclebuddy-forms.toolsmb-lab.workers.dev';
