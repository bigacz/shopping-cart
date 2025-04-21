import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
      assets: '/src/assets',
      lib: '/src/lib',
      src: '/src',
      styles: '/src/styles',
      data: '/src/data',
    },
  },
});
