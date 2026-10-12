import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

const basePath = process.env.BASE_PATH || "/psynapse-website/";
const rawPort = Number(process.env.PORT || 5173);

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
    dedupe: ["react", "react-dom"],
  },
  server: { port: rawPort, host: "0.0.0.0", allowedHosts: true },
  preview: { port: rawPort, host: "0.0.0.0", allowedHosts: true },
});
