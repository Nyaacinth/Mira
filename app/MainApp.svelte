<script lang="ts">
    import Router from "svelte-spa-router"
    import Splash from "./views/Splash.svelte"

    import "material-icons/iconfont/material-icons.css"
    import "svelte-material-ui/themes/material.css"

    import "@unocss/reset/tailwind-compat.css"
    import "uno.css"

    const routes = {
        "/": Splash
    }
</script>

<Router {routes} />

<style lang="scss">
    :root {
        --mdc-theme-primary: #3eaf7c;
        --mdc-theme-secondary: #676778;
        --mdc-theme-background: #fff;
        --mdc-theme-surface: #fff;
        --mdc-theme-error: #b71c1c;
        --mdc-theme-on-primary: #fff;
        --mdc-theme-on-secondary: #fff;
        --mdc-theme-on-surface: #000;
        --mdc-theme-on-error: #fff;
        --mdc-theme-text-primary-on-background: rgba(0, 0, 0, 0.87);
        --mdc-theme-text-secondary-on-background: rgba(0, 0, 0, 0.54);
        --mdc-theme-text-hint-on-background: rgba(0, 0, 0, 0.38);
        --mdc-theme-text-disabled-on-background: rgba(0, 0, 0, 0.38);
        --mdc-theme-text-icon-on-background: rgba(0, 0, 0, 0.38);
        --mdc-theme-text-primary-on-light: rgba(0, 0, 0, 0.87);
        --mdc-theme-text-secondary-on-light: rgba(0, 0, 0, 0.54);
        --mdc-theme-text-hint-on-light: rgba(0, 0, 0, 0.38);
        --mdc-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38);
        --mdc-theme-text-icon-on-light: rgba(0, 0, 0, 0.38);
        --mdc-theme-text-primary-on-dark: white;
        --mdc-theme-text-secondary-on-dark: rgba(255, 255, 255, 0.7);
        --mdc-theme-text-hint-on-dark: rgba(255, 255, 255, 0.5);
        --mdc-theme-text-disabled-on-dark: rgba(255, 255, 255, 0.5);
        --mdc-theme-text-icon-on-dark: rgba(255, 255, 255, 0.5);
    }
</style>
