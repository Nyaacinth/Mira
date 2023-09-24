import pluginUno from "unocss/vite"
import pluginChecker from "vite-plugin-checker"
import pluginSolid from "vite-plugin-solid"

import { defineConfig } from "vite"

export default defineConfig({
    server: {
        port: 1420,
        strictPort: true
    },
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    build: {
        target: ["es2021", "chrome105", "safari13"]
    },
    plugins: [
        pluginSolid(),
        pluginUno(),
        pluginChecker({
            typescript: { tsconfigPath: "tsconfig.json" },
            eslint: {
                lintCommand:
                    "eslint \
                    --config .eslintrc.json \
                    --ignore-path .gitignore \
                    --no-error-on-unmatched-pattern \
                    ./**/*.{js,ts,jsx,tsx}"
            }
        })
    ]
})
