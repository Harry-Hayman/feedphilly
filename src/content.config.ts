import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Astro 5 Content Layer collections.
 *
 * Moved here from the legacy `src/content/config.ts` because legacy collections
 * do not resolve their `image()` fields once the project has an adapter (the
 * Keystatic admin routes need one). The glob loader resolves them into the
 * content store instead, which works in both static and on demand rendering.
 *
 * The generated entry ids match the URLs the site already publishes:
 * the file name, lowercased, with whitespace collapsed to hyphens.
 */

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // `coerce` so the field still validates when Keystatic writes the date
      // back as a quoted string (YAML then hands us a string, not a Date).
      pubDate: z.coerce.date(),
      draft: z.boolean().optional(),
      author: z.string(),
      authorImage: image(),
      authorImageAlt: z.string().optional(),
      cardImage: image(),
      cardImageAlt: z.string(),
      description: z.string(),
      // Legacy key still present in some posts and round-tripped by Keystatic.
      // Nothing renders it; it is declared only so it never trips validation.
      contents: z.union([z.array(z.string()), z.string()]).optional(),
      markdown: z.string().optional(),
      tags: z.array(z.string()).default(['food security']),
      readTime: z.number().optional(),
    }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string(),
      image: image(),
      authorImageAlt: z.string().optional(),
      // Optional personal or professional site, linked from the member's card
      // on /about.
      website: z.string().url().optional(),
      order: z.number().optional(),
    }),
});

export const collections = { blog, team };
