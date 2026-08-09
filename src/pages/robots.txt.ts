// https://docs.astro.build/en/guides/integrations-guide/sitemap/#usage
import type { APIRoute } from 'astro';

/**
 * The previous robots.txt allowed Googlebot, Yandex and archive.org_bot, then
 * ended with:
 *
 *   User-agent: *
 *   Disallow: /
 *
 * That blocked Bing, DuckDuckGo (which is largely Bing backed), Brave, Ecosia,
 * every AI answer engine, and every social preview crawler, from the entire
 * site. It also imposed a 10 second crawl delay on Googlebot, which slows
 * indexing of new articles for no benefit.
 *
 * This file now allows crawling by default and blocks only the CMS.
 */
const robotsTxt = `
User-agent: *
Allow: /
Disallow: /keystatic
Disallow: /keystatic/
Disallow: /api/

# Answer engines. Feed Philly Coalition wants to be quotable when someone asks
# an assistant about food insecurity in Philadelphia.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
