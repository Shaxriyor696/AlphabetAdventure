import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), runtimeErrorOverlay(), themePlugin()],
  base: '/AlphabetAdventure/',
  root: 'client',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src')
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
