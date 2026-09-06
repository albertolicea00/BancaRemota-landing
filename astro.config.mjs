import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  integrations: [
    tailwind({
      // We keep our own global.css (with @tailwind directives) imported from
      // BaseLayout instead of relying on the integration's auto-injected stylesheet.
      applyBaseStyles: false,
    }),
  ],
});
