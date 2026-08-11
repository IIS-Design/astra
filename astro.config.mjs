import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Output mode: static site generation (default)
  output: 'static',
  
  // Base URL for the site (root path)
  base: process.env.BASE_PATH || '/',
  
  // Trailing slash behavior - 'ignore' allows both /path and /path/ to work
  trailingSlash: 'ignore',
  
  // Build configuration
  build: {
    format: 'directory', // Creates /path/index.html instead of /path.html
  },
  
  vite: {
    preview: {
      allowedHosts: [
        'uxipsos-astra-84a1bc8bfda0.herokuapp.com',
        '.herokuapp.com',
        'localhost',
      ],
    },
  },
});
