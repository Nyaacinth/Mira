import { VitePWAOptions } from "vite-plugin-pwa"

export default <Partial<VitePWAOptions>>{
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
                type: "image/png",
                purpose: "any"
            },
            {
                src: "pwa-icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "pwa-icon-1024x1024.png",
                sizes: "1024x1024",
                type: "image/png",
                purpose: "any"
            }
        ]
    },
    workbox: {
        maximumFileSizeToCacheInBytes: 4194304,
        globPatterns: ["**/*.{js,css,html,svg,png,woff,woff2,wav}"]
    }
}
