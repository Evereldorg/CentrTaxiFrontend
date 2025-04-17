import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { VitePluginSitemap } from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    }),
    VitePluginSitemap({
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
          vendor: ['react-slick', 'slick-carousel'] // Добавьте свои библиотеки
        },
        assetFileNames: 'assets/[name].[hash].[ext]',
        entryFileNames: 'assets/[name].[hash].js'
      }
    },
    minify: 'terser',
    sourcemap: false // Для production можно отключить
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://center-taxi.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      }
    },
    host: true,
    port: 5173
  },
  define: {
    'process.env': {},
    __SITE_URL__: JSON.stringify('https://center-taxi.ru') // Для использования в коде
  },
  preview: {
    port: 4173,
    host: true
  }
});