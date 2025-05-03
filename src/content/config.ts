import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    authorImage: image(),
    // authorImageAlt: z.string(),
    cardImage: image(),
    cardImageAlt: z.string(),
    description: z.string(),
    // contents: z.array(z.string()),
    markdown: z.string().optional(),
    tags: z.array(z.string()).default(['food security']),
    readTime: z.number().optional()
  })
});

const team = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    image: image(),
    order: z.number().optional()
  })
});

// Exporting the collections
// to be used in the Astro project
// and to be imported in the pages
// or components where needed

export const collections = {
  blog,
  team,
};