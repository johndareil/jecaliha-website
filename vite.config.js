import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import base44 from '@base44/vite-plugin';
import path from 'path'; // <--- Add path import

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // This tells Vite that "@/" points directly to your "src/" folder
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        notFound: '404.html',
      },
    },
  },
  plugins: [
    base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
  ]
});