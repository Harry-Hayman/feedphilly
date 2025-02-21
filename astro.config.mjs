import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from 'url';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true, // Enable edge middleware
  }),
  integrations: [
    tailwind({
      // Ensure Tailwind classes are processed
      applyBaseStyles: false,
    }),
    mdx({
      // Enable MDX features
      syntaxHighlight: 'prism',
      remarkPlugins: ['remark-gfm'],
      rehypePlugins: ['rehype-prism-plus']
    }),
    sitemap()
  ],
  image: {
    // Enable sharp for image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@content': fileURLToPath(new URL('./src/content', import.meta.url)),
        '@data': fileURLToPath(new URL('./src/data_files', import.meta.url)),
        '@images': fileURLToPath(new URL('./src/images', import.meta.url)),
        '@scripts': fileURLToPath(new URL('./src/assets/scripts', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
      }
    },
    build: {
      cssCodeSplit: true,
      assetsDir: '_astro',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name][extname]'
        }
      }
    },
    css: {
      postcss: {
        plugins: async () => [
            (await import('tailwindcss')).default,
            (await import('autoprefixer')).default,
          ],
      },
    }
  }
});
