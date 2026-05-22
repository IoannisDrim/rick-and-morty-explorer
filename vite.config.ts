import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import graphql from "vite-plugin-graphql-loader";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), graphql()],
  resolve: {
    // Array form so `@graphql/gql` matches before the bare `@graphql` file alias.
    alias: [
      { find: "@components", replacement: resolve(__dirname, "src/components") },
      { find: "@views", replacement: resolve(__dirname, "src/views") },
      { find: "@utils", replacement: resolve(__dirname, "src/utils") },
      { find: "@assets", replacement: resolve(__dirname, "src/assets") },
      { find: "@graphql", replacement: resolve(__dirname, "src/graphql/index.ts") },
      { find: "@shared", replacement: resolve(__dirname, "src/shared") },
      { find: "@hooks", replacement: resolve(__dirname, "src/hooks") },
    ],
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          apollo: ["@apollo/client", "graphql"],
          virtuoso: ["react-virtuoso"],
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
});
