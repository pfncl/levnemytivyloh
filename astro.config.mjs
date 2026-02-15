// @ts-check
import { defineConfig, envField } from 'astro/config';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://levnemytivyloh.cz',
  build: { inlineStylesheets: 'always' },
  integrations: [svelte()],
  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      ORDER_EMAIL: envField.string({ context: 'server', access: 'secret', default: 'info@levnemytivyloh.cz' }),
      ADMIN_PASSWORD: envField.string({ context: 'server', access: 'secret' }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },
});
