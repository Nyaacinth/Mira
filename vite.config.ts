import { svelte as Svelte } from "@sveltejs/vite-plugin-svelte"
import UnoCSS from "unocss/vite"
import { VitePWA } from "vite-plugin-pwa"

import { defineConfig } from "vite"

export default defineConfig(() => {
    return {
        base: "./",
        server: {
            port: 1420,
            strictPort: true
        },
        clearScreen: false,
        envPrefix: ["VITE_", "TAURI_"],
        build: {
            target: ["es2021", "chrome105", "safari13"]
        },
        plugins: !(process.env.MIRA_BUILD_MODE == "PWA")
            ? [Svelte(), UnoCSS()]
            : [
                  Svelte(),
                  UnoCSS(),
                  VitePWA({
                      strategies: "generateSW",
                      includeAssets: ["pwa-icon-192x192.png", "pwa-icon-512x512.png"],
                      manifest: {
                          name: "Mira",
                          short_name: "Mira",
                          description: "Rainy",
                          theme_color: "#d1d5db",
                          icons: [
                              {
                                  src: "pwa-icon-192x192.png",
                                  sizes: "192x192",
                                  type: "image/png"
                              },
                              {
                                  src: "pwa-icon-512x512.png",
                                  sizes: "512x512",
                                  type: "image/png"
                              }
                          ]
                      },
                      workbox: {
                          maximumFileSizeToCacheInBytes: 4194304,
                          globPatterns: ["**/*.{js,css,html,svg,png,woff,woff2,wav}"]
                      }
                  })
              ]
    }
})
