import react from "@vitejs/plugin-react";
import { join } from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    outDir: "build",
    sourcemap: true,
  },
  esbuild: {
    legalComments: "none",
  },
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: join(process.cwd(), "node_modules/$1"),
      },
    ],
  },
  plugins: [
    react(),
    VitePWA({
      manifest: false,
      registerType: "autoUpdate",
    }),
  ],
  test: {
    environment: "happy-dom",
  },
});
