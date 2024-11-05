import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_FRONTEND_PORT
      ? +process.env.VITE_FRONTEND_PORT
      : 3000,
  },
});
