import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: "main.jsx",
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: "./src" },
      { find: "@pages", replacement: "./src/pages" },
      { find: "@components", replacement: "./src/components" },
    ],
  },
});
