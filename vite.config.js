import { defineConfig } from "vite";
import path from "path";

const root = path.resolve(__dirname);

export default defineConfig({
  resolve: {
    alias: {
      "@snake": path.resolve(__dirname, "./Games/Snake"),
      "@projects": path.resolve(__dirname, "./projects"),
      "@app": path.resolve(__dirname, "./src/Application"),
      "@assets": path.resolve(__dirname, "./src/Engine/Assets"),
      "@errors": path.resolve(__dirname, "./src/Application/Errors"),
      "@error": path.resolve(__dirname, "./src/Application/Errors"),
      "@core": path.resolve(__dirname, "./src/Engine/Core"),
      "@lib": path.resolve(__dirname, "./src/Engine/Lib"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});
