// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://davidoneilai.github.io/davidoneil/
// For a user site (davidoneilai.github.io), set base: '/'
const isPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: 'https://davidoneilai.github.io',
  base: isPages ? '/davidoneil' : '/',
  trailingSlash: 'always',
});
