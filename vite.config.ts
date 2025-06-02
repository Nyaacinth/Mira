import pluginTailwind from "@tailwindcss/vite"
import pluginSolid from "vite-plugin-solid"

import { defineConfig } from "vite"

export default defineConfig({
    plugins: [pluginSolid(), pluginTailwind()]
})
