import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

import path from 'path'
import { readdirSync } from 'fs'

const absolutePathAliases: { [key: string]: string } = {};
// Root resources folder
const srcPath = path.resolve('./src/');
// Ajust the regex here to include  .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) => dirent.name.replace(/(\.ts){1}(x?)/, ''));

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  root: 'src',
  resolve: {
    alias: {
      ...absolutePathAliases
    }
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgr()
  ],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  preview: {
    open: false,
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [],
    },
  },
  build: {
    // it's needed, because the root setting for the defineConfig. Otherwise dist folder would be created under /src
    outDir: '../dist',
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
    }
  }
})
