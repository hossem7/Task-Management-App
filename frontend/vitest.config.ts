/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,        // so you can use `describe`/`it` without imports
    setupFiles: './vitest.setup.ts',
    coverage: { provider: 'istanbul' },
  },
});