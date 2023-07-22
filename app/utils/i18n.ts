import { i18n } from "i18next"
import { writable } from "svelte/store"

export function createStoreFromI18n(i18n: i18n) {
    const i18nStore = writable(i18n)
    i18n.on("initialized", () => i18nStore.set(i18n))
    i18n.on("loaded", () => i18nStore.set(i18n))
    i18n.on("added", () => i18nStore.set(i18n))
    i18n.on("languageChanged", () => i18nStore.set(i18n))
    return i18nStore
}
