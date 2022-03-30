import reactRefresh from "@vitejs/plugin-react-refresh";
import { join } from "path";
import { defineConfig } from "vite";

import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    outDir: "build",
    sourcemap: true,
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
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
    reactRefresh(),
    VitePWA({
      manifest: false,
      registerType: "autoUpdate",
    }),
  ],
  test: {
    environment: "happy-dom",
  },
});
