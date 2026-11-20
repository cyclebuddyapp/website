// Site-wide constants. Change values here, not in components.
export const SITE = {
  name: 'CycleBuddy',
  url: 'https://cyclebuddyapp.com',
  email: 'hello@cyclebuddy.ca',
  location: 'Ontario, Canada',
};

// Cloudflare Worker that receives the forms (see /worker and SETUP.md).
// Set PUBLIC_FORMS_ENDPOINT in the GitHub Actions workflow (or a local .env) once the Worker is deployed,
// e.g. https://cyclebuddy-forms.<your-subdomain>.workers.dev
export const FORMS_ENDPOINT: string = import.meta.env.PUBLIC_FORMS_ENDPOINT ?? '';
