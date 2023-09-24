import i18next from "i18next"
import { createSignal } from "solid-js"

const i18nInstance = i18next.createInstance()

i18nInstance
    .use({
        type: "languageDetector",
        async: true,
        detect: (callback: (arg1: any) => any) => {
            const language = navigator.language.split("-")[0]
            callback(language)
        },
        init: () => {},
        cacheUserLanguage: () => {}
    })
    .init({
        interpolation: { escapeValue: false },
        fallbackLng: "en",
        resources: {
            ["en"]: {
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
            ["zh"]: {
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
        }
    })

export const i18n = (() => {
    const [i18nSignal, dispatchI18nSignalWith] = createSignal(i18nInstance)

    i18nInstance.on("initialized", () => dispatchI18nSignalWith(i18n))
    i18nInstance.on("loaded", () => dispatchI18nSignalWith(i18n))
    i18nInstance.on("added", () => dispatchI18nSignalWith(i18n))
    i18nInstance.on("languageChanged", () => dispatchI18nSignalWith(i18n))

    return i18nSignal
})()
