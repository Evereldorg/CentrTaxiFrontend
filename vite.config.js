import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer({
          overrideBrowserslist: ['last 2 versions', '>1%'],
        })
      ]
    }
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1500,
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom', 'react-slick']
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://centrtaxibackend-production.up.railway.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
