import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // Simulates a browser (window, document)
    setupFiles: "./src/setupTests.ts", // We will create this next
    globals: true, // Allows using 'describe', 'it', 'expect' without importing
  },
});
