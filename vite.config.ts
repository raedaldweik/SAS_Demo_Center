import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import excelDemos from './plugins/excel-demos';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), excelDemos('demos.xlsx')],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
