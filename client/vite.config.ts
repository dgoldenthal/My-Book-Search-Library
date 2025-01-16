import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@apollo/client': path.resolve(__dirname, 'node_modules/@apollo/client'),
    },
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
  preview: {
    port: 5000,
    // Ensure that the app serves index.html for all SPA routes during preview
    // This is critical for React Router to function in production builds
    fallback: true,
  },
  optimizeDeps: {
    entries: ['index.html'], // Ensure Vite knows about the entry file
  },
});
