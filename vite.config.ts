import { svelte as Svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import UnoCSS from "unocss/vite"

import { defineConfig } from "vite"

export default defineConfig({
    server: {
        port: 1420,
        strictPort: true
    },
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    build: {
        target: ["es2022", "safari16"]
    },
    plugins: [
        Svelte({
            preprocess: vitePreprocess()
        }),
        UnoCSS()
    ]
})
