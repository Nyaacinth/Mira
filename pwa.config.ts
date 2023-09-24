import { VitePWAOptions } from "vite-plugin-pwa"

export default <Partial<VitePWAOptions>>{
    strategies: "generateSW",
    manifest: {
        name: "Mira",
        short_name: "Mira",
        description: "Rainy",
        theme_color: "#d1d5db",
        icons: [
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
