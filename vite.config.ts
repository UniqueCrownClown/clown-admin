import path from "path";
const resolve = (dir: string) => path.join(__dirname, dir);

import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), WindiCSS()],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "^/dev-basic-api": {
        target: `http://127.0.0.1:5000`,
        changeOrigin: true, // target是域名的话，需要这个参数，
        secure: false, // 设置支持https协议的代理
        ws: false,
        rewrite: (path) => path.replace(/^\/dev-basic-api/, ""),
      },
    },
  },
});
