import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cargotopakistan.ae',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    // shortcut: lastmod is the build date for every page, upgrade to per-file git dates if needed
    sitemap({ filter: (page) => !page.includes('/thank-you'), lastmod: new Date() }),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
