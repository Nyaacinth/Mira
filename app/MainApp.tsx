import { Route, Router } from "@solidjs/router"
import { Component, onCleanup, onMount } from "solid-js"
import { doTauriInit } from "./utils/doTauriInit"
import { Splash } from "./views/Splash"

import "./MainApp.css"

export const MainApp: Component = () => {
    onMount(() => {
        const tauriInitCleanup = doTauriInit()
        onCleanup(() => {
            tauriInitCleanup()
        })
    })

    return (
        <Router>
            <Route path="/" component={Splash} />
        </Router>
    )
}
