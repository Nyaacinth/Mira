import { Route, Router, Routes } from "@solidjs/router"
import * as tauri from "@tauri-apps/api"
import { Component, onMount } from "solid-js"
import { Splash } from "./views/Splash"

import "@unocss/reset/tailwind-compat.css"
import "uno.css"

export const MainApp: Component = () => {
    onMount(() => {
        if ("__TAURI__" in window) {
            tauri.window.appWindow.show()
            tauri.window.appWindow.setFocus()
        }
    })

    return (
        <Router>
            <Routes>
                <Route path="/" component={Splash} />
            </Routes>
        </Router>
    )
}
