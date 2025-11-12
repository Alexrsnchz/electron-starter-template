import { defineConfig } from 'electron-vite';

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main',
      lib: { entry: 'src/main/index.ts' },
    },
  },
  preload: {
    build: {
      outDir: 'dist/preload',
      lib: { entry: 'src/preload/index.ts' },
    },
  },
  renderer: {
    build: { outDir: 'dist/renderer' },
    plugins: [],
  },
});
