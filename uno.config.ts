import presetRemToPx from "@unocss/preset-rem-to-px"
import presetWind from "@unocss/preset-wind"

import { defineConfig } from "unocss"

export default defineConfig({
    presets: [presetWind(), presetRemToPx()]
})
