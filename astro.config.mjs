import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import { fileURLToPath } from 'url';

// https://astro.build/config
export default defineConfig({
  site: 'https://feedphilly.netlify.app',
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true
  }),
  build: {
    inlineStylesheets: 'always'
  },
  integrations: [
    tailwind({
      // Ensure Tailwind classes are processed
      applyBaseStyles: true,
      nesting: true,
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
    css: {
      postcss: {
        plugins: async () => [
          (await import('tailwindcss')).default,
          (await import('autoprefixer')).default,
        ],
      },
    },
    build: {
      cssCodeSplit: false,
      cssMinify: true,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        }
      }
    }
  }
});
