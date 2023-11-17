import { VitePWA as pluginVitePWA } from "vite-plugin-pwa"
import vitePWAConfig from "./pwa.config"
import baseViteConfig from "./vite.config"

import { defineConfig, mergeConfig } from "vite"

export default mergeConfig(
    baseViteConfig,
    defineConfig({
        plugins: [pluginVitePWA(vitePWAConfig)]
    })
)
