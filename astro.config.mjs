import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from 'url';

// https://astro.build/config
export default defineConfig({
  site: 'https://feedphillycoalition.org',
  output: 'static',
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
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Optimize image quality and formats
    format: ['avif', 'webp'],
    quality: 80,
    minimumDimensions: true
  },
  compressHTML: true,
  experimental: {
    // Extract critical CSS
    inlineStylesheets: 'always'
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
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    css: {
      postcss: {
        plugins: async () => [
          (await import('tailwindcss')).default,
          (await import('autoprefixer')).default,
          (await import('cssnano')).default({
            preset: ['default', {
              discardComments: { removeAll: true },
              normalizeWhitespace: true
            }]
          })
        ],
      },
    }
  }
});
