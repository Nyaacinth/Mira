import i18next from "i18next"
import { createStoreFromI18n } from "../../utils/i18n"

const i18nInstance = i18next.createInstance()

i18nInstance.init({
    lng: /^zh.+/.test(navigator.language) ? "zh" : "en",
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                audio0Label: "Deep",
                audio1Label: "Rumble",
                audio2Label: "Dark",
                audio3Label: "Summer",
                audio4Label: "Drops",
                audio5Label: "Clear",
                audio6Label: "Urban",
                audio7Label: "Balcony",
                audio8Label: "Pitter",
                audio9Label: "White Noise"
            }
        },
        zh: {
            translation: {
                audio0Label: "深邃",
                audio1Label: "隆隆",
                audio2Label: "乌云",
                audio3Label: "夏日",
                audio4Label: "点滴",
                audio5Label: "清润",
                audio6Label: "都市",
                audio7Label: "阳台",
                audio8Label: "淅沥",
                audio9Label: "白噪"
            }
        }
    },
    interpolation: {
        escapeValue: false // Since we're using Svelte
    }
})

export const i18n = createStoreFromI18n(i18nInstance)
