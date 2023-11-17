import pluginChecker from "vite-plugin-checker"
import pluginSolid from "vite-plugin-solid"

import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        pluginSolid(),
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
