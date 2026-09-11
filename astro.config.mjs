// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.mintirhohcs.co.za',
  // React renders shadcn components in src/components/ui to static HTML at build
  // time. No client JavaScript ships unless a component uses a client: directive.
  integrations: [sitemap(), react()],
  // prefetchAll fetches a link's HTML ahead of a click so in-page navigations feel
  // instant instead of waiting on a cold fetch. 'hover' triggers only on actual
  // intent to click — 'viewport' fires every nav link at once on every pageview
  // (the whole header + all service pages), saturating the connection pool and
  // slowing down the click a visitor is actually about to make.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-jakarta',
      weights: ['400 800'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],
});
