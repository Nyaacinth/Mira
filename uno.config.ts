import presetWind from "@unocss/preset-wind"

import { defineConfig } from "unocss"

export default defineConfig({
    presets: [presetWind()],
    theme: {
        breakpoints: {
            mobile: "320px"
        }
    }
})
