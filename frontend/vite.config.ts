import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslint({
      cache: false, // Disable caching for immediate feedback
      include: ["src/**/*.js", "src/**/*.ts", "src/**/*.jsx", "src/**/*.tsx"],
    }),
  ],
  server: {
    port: process.env.VITE_FRONTEND_PORT
      ? +process.env.VITE_FRONTEND_PORT
      : 3000,
  },
});
