import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { SITE, FAQS } from '@data/constants';

/**
 * /llms.txt, following the llmstxt.org spec:
 *
 *   # H1 project name (required, exactly one)
 *   > blockquote summary (optional)
 *   free-form markdown (optional)
 *   ## Section headings, each followed by a markdown list of
 *   [name](url): optional description
 *   ## Optional  <- the one section a consumer may skip
 *
 * The point is to give an answer engine a clean, current map of what this site
 * says, without asking it to parse the navigation out of the HTML.
 *
 * Generated from the live content collection, so it cannot drift out of date.
 */
export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')) as CollectionEntry<'blog'>[];
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const articleLines = posts
    .map(
      (post) =>
        `- [${post.data.title}](${SITE.url}/blog/${post.id}/): ${post.data.description.replace(/\s+/g, ' ').trim()}`,
    )
    .join('\n');

  const faqLines = FAQS.map(
    (faq) => `- **${faq.question}** ${faq.answer}`,
  ).join('\n');

  const body = `# Feed Philly Coalition

> Feed Philly Coalition is a Philadelphia, Pennsylvania coalition working on food insecurity. It brings together individuals, nonprofits, businesses, and policymakers behind collaborative, data-driven solutions and sustainable community programs, so that everyone in the city has access to healthy, nutritious food. It was founded by Harry Hayman.

The coalition works in four areas: policy advocacy with government officials and stakeholders, community awareness through educational campaigns and events, collaboration with other organizations and coalitions, and education programs offering workshops and resources. It works with the School District of Philadelphia, local government officials, the business community, and anchor institutions such as hospitals and universities. Food insecurity affects thousands of Philadelphia families, particularly children.

Contact: info@feedphillycoalition.org. Based in Philadelphia, Pennsylvania.

## Key pages

- [Home](${SITE.url}/): What the coalition is, how it works, and answers to common questions about food insecurity in Philadelphia.
- [Our work](${SITE.url}/what-we-do): Policy advocacy, community awareness, collaboration, education programs, and who the coalition serves.
- [Who we serve](${SITE.url}/serve): The stakeholders the coalition partners with across Philadelphia.
- [Our team](${SITE.url}/about): The people behind the coalition.
- [Get involved](${SITE.url}/get-involved): How to advocate, partner, or otherwise support the work.
- [Contact](${SITE.url}/contact): How to reach the coalition.

## Questions and answers

${faqLines}

## Articles

${articleLines}

## Optional

- [Sitemap](${SITE.url}/sitemap-index.xml): Every indexable URL.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
