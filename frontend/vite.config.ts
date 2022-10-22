import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    outDir: "build",
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
  esbuild: {
    legalComments: "none",
  },
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: "$1",
      },
    ],
  },
  plugins: [
    react(),
    VitePWA({
      manifest: false,
      registerType: "autoUpdate",
      selfDestroying: true,
    }),
  ],
  test: {
    environment: "happy-dom",
  },
});
