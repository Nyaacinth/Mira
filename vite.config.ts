import { svelte as Svelte } from "@sveltejs/vite-plugin-svelte"
import UnoCSS from "unocss/vite"

import { defineConfig } from "vite"

export default defineConfig({
    plugins: [Svelte(), UnoCSS()]
})
