<script lang="ts">
    import IconButton from "@smui/icon-button"
    import List, { Item as ListItem, Text as ListText } from "@smui/list"
    import { onDestroy, onMount } from "svelte"
    import { slide } from "svelte/transition"
    import { RainvillePlayer } from "../models/RainvillePlayer"
    import { clickOutside } from "../utils/clickOutside"

    const player = new RainvillePlayer()

    let menuIsOpen = false

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key == " ") {
            player.paused = !player.paused
        } else if (event.key == "Enter") {
            menuIsOpen = true
        } else if (event.key == "Escape") {
            menuIsOpen = false
        }
    }

    onMount(() => {
        window.addEventListener("keydown", handleKeyDown)
    })

    onDestroy(() => {
        player.handleDestroy()
        window.removeEventListener("keydown", handleKeyDown)
    })
</script>

<div class="relative w-100% h-100% bg-gray-300">
    <div data-tauri-drag-region class="flex flex-col absolute w-100% h-100% justify-center items-center">
        <div class="material-icons text-6xl text-gray-500">cloud</div>
        <div class="pb-4" />
        <IconButton class="material-icons text-3xl text-gray-500" on:click={() => (player.paused = !player.paused)}>
            {player.paused ? "play_circle_outline" : "pause_circle"}
        </IconButton>
    </div>
    <div class="flex absolute bottom-0 p-1 w-100% justify-center items-center">
        <div
            class="w-35px h-7px rounded-100 bg-gray-600"
            on:click={() => (menuIsOpen = !menuIsOpen)}
            on:keypress={() => {
                /** Never Triggered, exist only for a11y rules from svelte compiler, a11y will be handled by handleKeyDown */
            }}
        />
    </div>
    {#if menuIsOpen}
        <div
            class="absolute bottom-0 w-100% h-50% overflow-scroll bg-white"
            transition:slide={{ axis: "y" }}
            use:clickOutside
            on:click={(event) => {
                if (event.detail == 1024 /** See ${workspaceFolder}/app/utils/clickOutside.ts */) menuIsOpen = false
            }}
            on:keypress={() => {
                /** Never Triggered, exist only for a11y rules from svelte compiler, a11y will be handled by handleKeyDown */
            }}
        >
            <List>
                {#each player.tracks as [trackName], index}
                    <ListItem on:SMUI:action={() => (player.trackNum = index)}>
                        <ListText class={player.trackNum == index ? "text-[var(--mdc-theme-primary)]" : ""}>
                            {trackName}
                        </ListText>
                    </ListItem>
                {/each}
            </List>
        </div>
    {/if}
</div>
