import reactRefresh from "@vitejs/plugin-react-refresh";
import { join } from "path";
import { defineConfig } from "vite";

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
  plugins: [reactRefresh()],
  test: {
    environment: "happy-dom",
  }
});
