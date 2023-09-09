<script lang="ts">
    import { window as tauriWindow } from "@tauri-apps/api"
    import { onMount } from "svelte"
    import Router from "svelte-spa-router"
    import Splash from "./views/Splash.svelte"

    import "material-icons/iconfont/material-icons.css"
    import "svelte-material-ui/themes/material.css"
    import "./assets/styles/mdc-theme.scss"

    import "@unocss/reset/tailwind-compat.css"
    import "uno.css"

    const routes = {
        "/": Splash
    }

    onMount(() => {
        if ("__TAURI__" in window) {
            tauriWindow.appWindow.show()
            tauriWindow.appWindow.setFocus()
        }
    })
</script>

<Router {routes} />
