import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts live in src/content/blog/<lang>/<slug>.md.
// Use the same <slug> in every language so the language switcher can link between them.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    readMinutes: z.number().optional(),
    cover: z.enum(['rose', 'teal', 'night']).default('rose'),
    coverText: z.string().max(4),
    draft: z.boolean().default(false),
  }),
});

// Long-form pages (research, privacy) live in src/content/pages/<lang>/<name>.md.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    eyebrow: z.string(),
    h1: z.string(),
    lead: z.string(),
    updated: z.coerce.date(),
  }),
});

export const collections = { blog, pages };
