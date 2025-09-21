import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

process.env.BROWSER =
  '/mnt/c/Program Files/Google/Chrome Dev/Application/chrome.exe';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
  resolve: {
    alias: {
      components: '/src/components',
      pages: '/src/pages',
      assets: '/src/assets',
      lib: '/src/lib',
      src: '/src',
      styles: '/src/styles',
      data: '/src/data',
    },
  },
});
