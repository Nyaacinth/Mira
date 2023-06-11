import presetPxToRem from "@nyaacinth/unocss-preset-px-to-rem"
import presetWind from "@unocss/preset-wind"

import { defineConfig } from "unocss"

export default defineConfig({
    presets: [presetWind(), presetPxToRem()],
    theme: {
        breakpoints: {
            mobile: "320px"
        }
    }
})
