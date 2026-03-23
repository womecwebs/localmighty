import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import sitemap from "vite-plugin-sitemap";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Sitemap configuration
      sitemap({
        hostname: "https://localmighty.netlify.app", // Change this to your Netlify URL if needed
        dynamicRoutes: ["/", "/blog", "/about.html", "/privacy.html"],
        // This ensures the sitemap is generated in the 'dist' folder during build
        outDir: "dist",
      }),
    ],
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== "true",
    },
  };
});
