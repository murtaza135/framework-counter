import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "framework", replacement: "/framework" },
    ]
  },
});
