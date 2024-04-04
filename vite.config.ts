// @ts-nocheck

import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

// import { dependencies } from './package.json';

const renderChunks = (deps: Record<string, string>) => {
  const chunks: any = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom', 'stream-browserify'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve('./src/components'),
      constant: path.resolve('./src/constant'),
      hooks: path.resolve('./src/hooks'),
      i18n: path.resolve('./src/i18n'),
      pages: path.resolve('./src/pages'),
      routes: path.resolve('./src/routes'),
      styles: path.resolve('./src/styles'),
      theme: path.resolve('./src/theme'),
      resources: path.resolve('./src/resources'),
      store: path.resolve('./src/store'),
      utils: path.resolve('./src/utils'),
      mock: path.resolve('./src/mock'),
      services: path.resolve('./src/services'),

      // //Fix build dependencies
      // process: 'process/browser',
      'readable-stream': 'vite-compatible-readable-stream',
      zlib: 'browserify-zlib',
      util: 'util',
    },
  },
  plugins: [
    ViteEjsPlugin((viteConfig) => ({
      env: viteConfig.env,
    })),
    react(),
  ],
  build: {
    manifest: true,
    sourcemap: false,
    outDir: path.join(__dirname, 'build'),
    rollupOptions: {
      // output: {
      //   manualChunks: {
      //     vendor: ['react', 'react-router-dom', 'react-dom', 'stream-browserify'],
      //     ...renderChunks(dependencies),
      //   },
      // },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
