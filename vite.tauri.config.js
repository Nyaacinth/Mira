import Tauri from "vite-plugin-tauri"
import baseViteConfig from "./vite.config"

import { defineConfig, mergeConfig } from "vite"

export default mergeConfig(
    baseViteConfig,
    defineConfig({
        server: { open: false },
        build: { target: ["es2021", "chrome105", "safari13"] },
        clearScreen: false,
        plugins: [Tauri()]
    })
)
