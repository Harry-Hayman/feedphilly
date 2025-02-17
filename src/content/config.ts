import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    authorImage: z.string(),
    authorImageAlt: z.string(),
    cardImage: image(),
    cardImageAlt: z.string(),
    description: z.string(),
    contents: z.array(z.string()),
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
    image: image()
  })
});

export const collections = {
  blog,
  team
};