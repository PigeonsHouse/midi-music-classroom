import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaOptions: Partial<VitePWAOptions> = {
  manifest: {
    name: "鳩屋敷のWebピアノ",
    short_name: "Webピアノ",
    icons: [
      {
        sizes: "192x192",
        src: "icon.png",
        type: "image/png",
      },
    ],
    id: "/",
    start_url: ".",
    display: "standalone",
    theme_color: "#00D390",
    background_color: "#FFFFFF",
    description:
      "作者が自分用に機能盛り盛りにしたWeb上で音を出して弾けるピアノ。コードネームやディグリーの表示、トランスポーズ、MIDI入力などの機能がある。",
    screenshots: [
      {
        sizes: "1334x1366",
        src: "screenshot.png",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        sizes: "990x796",
        src: "screenshot2.png",
        type: "image/png",
        form_factor: "wide",
      },
    ],
  },
};

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(pwaOptions)],
});
