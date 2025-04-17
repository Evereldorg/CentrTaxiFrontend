import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import viteSitemap from 'vite-plugin-sitemap'; // Измененный импорт

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    }),
    viteSitemap({
      baseUrl: 'https://center-taxi.ru',
      routes: [
        {
          path: '/',
          changefreq: 'weekly',
          priority: 1.0,
          lastmod: new Date().toISOString()
        }
      ],
      generateRobotsTxt: true,
      robots: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin']
        }
      ]
    })
  ],
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
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://center-taxi.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  define: {
    'process.env': {}
  }
});