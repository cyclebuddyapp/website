import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/utils';

export type Post = CollectionEntry<'blog'>;

/** "en/why-small-ai" -> "why-small-ai" */
export const slugOf = (p: Post) => p.id.split('/').slice(1).join('/');
export const langOf = (p: Post) => p.id.split('/')[0] as Lang;

/** Posts for one language, newest first. Drafts are included (they are clearly labelled). */
export async function postsFor(lang: Lang) {
  const all = await getCollection('blog', (p) => langOf(p) === lang);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
