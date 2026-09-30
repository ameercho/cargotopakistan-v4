import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cargotopakistan.ae',
  output: 'static',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/thank-you') }), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
