import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ This works both locally and in Render builds
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: 'dist', // 👈 ensures build output goes to /dist
  },
});
