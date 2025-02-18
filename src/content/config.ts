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
    image: image()
  })
});

const products = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    description: z.string(),
    main: z.object({
      imgCard: image(),
      imgAlt: z.string(),
    })
  })
});

const achivement = defineCollection({
  type: 'content',
  schema: z.object({})
});

const feedphilly = defineCollection({
  type: 'content',
  schema: z.object({})
});

export const collections = {
  blog,
  team,
  products,
  achivement,
  feedphilly
};