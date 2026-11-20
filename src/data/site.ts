// Site-wide constants. Change values here, not in components.
export const SITE = {
  name: 'CycleBuddy',
  url: 'https://cyclebuddyapp.com',
  email: 'hello@cyclebuddy.ca',
  location: 'Ontario, Canada',
};

// Cloudflare Worker that receives the forms (see /worker and SETUP.md).
// The deployed Worker address. PUBLIC_FORMS_ENDPOINT (GitHub Actions variable or local .env) overrides it.
export const FORMS_ENDPOINT: string = import.meta.env.PUBLIC_FORMS_ENDPOINT || 'https://cyclebuddy-forms.toolsmb-lab.workers.dev';
