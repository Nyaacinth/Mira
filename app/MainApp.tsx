import { Route, Router, Routes } from "@solidjs/router"
import * as tauri from "@tauri-apps/api"
import { Component, onMount } from "solid-js"
import { Splash } from "./views/Splash"

import "./MainApp.css"

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
