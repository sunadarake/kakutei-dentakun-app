import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname, "src/renderer"), // レンダラーのソース
  base: "./", // 重要：Electronでファイルを読み込むために相対パスにする
  build: {
    outDir: resolve(__dirname, "dist/renderer"), // 出力先
    emptyOutDir: true,
  },
});
