import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const base = process.env.APP_BASE_PATH || "/";

export default defineConfig(({ command }) => ({
  base,
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    target: "esnext",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
}));
