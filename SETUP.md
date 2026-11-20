# Setup

How the pieces of cyclebuddyapp.com fit together, and the one-time steps to set them up.

```
Visitor ──► cyclebuddyapp.com (GitHub Pages, static site, this repo)
               │  forms post JSON
               ▼
            Cloudflare Worker  (worker/, "cyclebuddy-forms")
               │  HTTPS + API key (secret)
               ▼
            Resend  ──► email to hello@cyclebuddy.ca / confirmation to the visitor / waitlist contacts
```

---

## 1. Domain → GitHub Pages ✅ done (20 Nov 2026)

In **Namecheap → Domain List → cyclebuddyapp.com → Advanced DNS**:

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `cyclebuddyapp.github.io.` |

In **GitHub → repo Settings → Pages**: Source = *GitHub Actions*, Custom domain = `cyclebuddyapp.com`, **Enforce HTTPS** ticked.

Keep the Google email records (MX `smtp.google.com`, TXT `google-site-verification`, TXT `v=spf1…`, TXT `_dmarc`, TXT `google._domainkey`) and the Google CNAME `…googlehosted.com`. They are unrelated to the website.

---

## 2. Resend (sends the emails)

1. Create an account at <https://resend.com>.
2. **Domains → Add domain** → `cyclebuddyapp.com`. When asked for a region, pick **North America (us-east-1)**.
   Under *Advanced options*: Custom Return-Path `send`. Leave click/open **tracking off** and **receiving off** (Google handles incoming email).
3. Resend shows three DNS records. Add them in Namecheap → Advanced DNS → **Host Records** → *Add new record* (one at a time, ✓ after each). Use Resend's copy button, because the values are shown shortened:

   | Type | Host | Value |
   |---|---|---|
   | TXT | `resend._domainkey` | `p=MIGfMA…` (DKIM key, from Resend) |
   | CNAME | `rsend` | `rsend.…mta.net` (from Resend) |
   | CNAME | `send` | `send.…mta.net` (from Resend) |

   Namecheap adds `.cyclebuddyapp.com` by itself. These records live on sub-names, so they don't affect your Google email (MX stays as it is).
4. Back in Resend, click **Verify**. It's usually done within 15 minutes, though it can take longer.
5. **Audience / Segments**: create a segment named `Waitlist` and copy its **ID**.
6. **API Keys → Create API key** with **Full access** (sending emails *and* saving contacts). Copy it now (it's shown once). **Never paste it into the repo.**

> Your existing DMARC record (`p=reject`) is fine. Resend signs emails for `cyclebuddyapp.com` with DKIM, so they pass DMARC.

---

## 3. Cloudflare Worker (receives the forms)

Needs a free Cloudflare account (<https://dash.cloudflare.com/sign-up>). The domain does **not** need to move to Cloudflare.

```sh
cd worker
npm install
npx wrangler login                      # opens the browser once to connect your Cloudflare account
npx wrangler secret put RESEND_API_KEY  # paste the Resend key when asked (stored encrypted by Cloudflare)
```

Open `worker/wrangler.toml` and paste the Resend segment ID into `RESEND_SEGMENT_ID = "…"`. Then:

```sh
npx wrangler deploy
```

Wrangler prints the Worker's address, e.g. `https://cyclebuddy-forms.<your-subdomain>.workers.dev`. Opening it in a browser shows a small JSON status message.

---

## 4. Connect the website to the Worker

1. GitHub → repo **Settings → Secrets and variables → Actions → Variables → New repository variable**
   - Name: `PUBLIC_FORMS_ENDPOINT`
   - Value: the Worker address from step 3 (no trailing slash)
2. Update the `servers.url` in `public/.well-known/openapi.yaml` to the same address.
3. Push any commit (or *Actions → Deploy to GitHub Pages → Run workflow*) so the site rebuilds with the address.

For local development, create `website/.env` with `PUBLIC_FORMS_ENDPOINT=…` (it's git-ignored).

---

## 5. Test

- **Waitlist** on the homepage → you get a confirmation email, and the contact appears in Resend.
- **Contact** form → an email arrives at hello@cyclebuddy.ca. Hitting *Reply* answers the visitor.
- **Research partner** form on /research → email with the subject "Research partnership".
- Six quick submissions in a row → the sixth says "Too many attempts".

Logs: `cd worker && npx wrangler tail` (they show status codes only, never names or emails).

---

## How things are kept private

- The site sets **no cookies** and loads **nothing from third parties** (fonts are self-hosted).
- The Worker stores nothing. The visitor IP is only a short-lived rate-limit key in Cloudflare, never logged.
- The Resend API key is a Cloudflare secret, never in this repo.
- If analytics are ever added: cookieless and self-hosted only, and update `/privacy` first.

## Rules worth keeping

- **Stable URLs:** never change a published URL. If one must change, add a redirect.
- **Facts live in one place:** `src/data/facts.ts` feeds /facts and `llms.txt`. Edit there.
- **Not now (revisit later):** an MCP server for agents, and agent-commerce checkout. Purchases will happen in the app stores at launch.
