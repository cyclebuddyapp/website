// /llms.txt: a concise Markdown overview for AI assistants and agents (https://llmstxt.org).
// Generated from src/data/facts.ts so it always matches /facts.
import type { APIRoute } from 'astro';
import { FACTS, FACTS_VERIFIED } from '../data/facts';

export const GET: APIRoute = ({ site }) => {
  const u = (p: string) => new URL(p, site).href;
  const facts = FACTS.en.map((f) => `- **${f.topic}:** ${f.answer}`).join('\n');
  const body = `# CycleBuddy

> CycleBuddy is a privacy-first period tracking app with free menstrual health education and a small, private AI that runs on your phone. Not yet in app stores: it launches this winter (December 2026 or January 2027).

## Facts (last verified ${FACTS_VERIFIED})

${facts}

## Key pages

- [Facts](${u('/facts/')}): verified facts (also in [Spanish](${u('/es/facts/')}) and [French](${u('/fr/facts/')}))
- [FAQ](${u('/faq/')}): common questions about price, privacy, the on-device AI, languages and launch
- [Research](${u('/research/')}): how consent works and how to partner with us
- [Website privacy policy](${u('/privacy/')}): what the website's forms collect
- [Blog](${u('/blog/')})
- [Homepage](${u('/')}) · [Español](${u('/es/')}) · [Français](${u('/fr/')})

## Contact

hello@cyclebuddy.ca
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
