import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-highlight-dom': path.resolve(__dirname, '../../packages/react-highlight-dom/src'),
    },
  },
});
