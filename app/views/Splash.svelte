<script lang="ts">
    import IconButton from "@smui/icon-button"
    import List, { Item as ListItem, Text as ListText } from "@smui/list"
    import { onDestroy } from "svelte"
    import { slide } from "svelte/transition"
    import ClickOutside from "../components/ClickOutside.svelte"
    import { getRainvillePlayer } from "../models/RainvillePlayer"

    const playerPromise = getRainvillePlayer()

    let menuIsOpen = false

    onDestroy(() => playerPromise.then((player) => player.handleDestroy()))
</script>

<div class="relative w-100% h-100% bg-gray-300">
    {#await playerPromise}
        <div class="flex absolute w-100% h-100% justify-center items-center">
            <!-- Loading Spinner -->
            <div
                class="w-10 h-10 border-5 rounded-50% border-[#FFFFFFAF_#FFFFFFAF_#4FAFFFAF_#FFFFFFAF] animate-spin animate-duration-1000"
            />
        </div>
    {:then player}
        <div data-tauri-drag-region class="flex flex-col absolute w-100% h-100% justify-center items-center">
            <svg class="w-14 h-14 fill-current text-gray-500" height="48" viewBox="0 -960 960 960" width="48">
                <!-- Material Symbol - Rainy -->
                <path
                    d="M558-83q-11 5-23.5 1T517-97l-69-138q-5-11-1.5-23.5T461-276q11-5 23.5-1t17.5 15l69 138q5 11 1.5 23.5T558-83Zm240-1q-11 5-23.5 1T757-98l-69-138q-5-11-1.5-23.5T701-277q11-5 23.5-1t17.5 15l69 138q5 11 1.5 23.5T798-84Zm-480 0q-11 5-23.5 1.5T277-97l-69-138q-5-11-1-23.5t15-17.5q11-5 23.5-1.5T263-263l69 139q5 11 1 23t-15 17Zm-28-256q-87 0-148.5-61.5T80-550q0-79 56.5-141T277-759q32-56 84.5-88.5T480-880q91 0 152.5 57.5T708-680q79 4 125.5 53.5T880-510q0 70-49.5 120T710-340H290Zm0-60h420q46 0 78-32.5t32-77.5q0-46-32-78t-78-32h-60v-30q0-71-49.5-120.5T480-820q-51 0-93.5 27.5T324-718l-8 18h-28q-62 2-105 45.5T140-550q0 62 44 106t106 44Zm190-210Z"
                />
            </svg>
            <div class="pb-4" />
            <IconButton class="material-icons text-3xl text-gray-500" on:click={() => (player.paused = !player.paused)}>
                {player.paused ? "play_circle_outline" : "pause_circle"}
            </IconButton>
        </div>
        <div class="flex absolute bottom-0 p-1 w-100% justify-center items-center">
            <IconButton class="material-icons text-3xl text-gray-500" on:click={() => (menuIsOpen = !menuIsOpen)}>
                keyboard_arrow_up
            </IconButton>
        </div>
        {#if menuIsOpen}
            <ClickOutside
                on:click-outside={() => {
                    menuIsOpen = false
                }}
            >
                <div class="absolute bottom-0 w-100% h-50% overflow-scroll bg-white" transition:slide={{ axis: "y" }}>
                    <List>
                        {#each player.tracks as [trackName], index}
                            <ListItem
                                class="mobile:text-0.75rem mobile:py-5"
                                on:SMUI:action={() => (player.trackNum = index)}
                            >
                                <ListText class={player.trackNum == index ? "text-[var(--mdc-theme-primary)]" : ""}>
                                    {trackName}
                                </ListText>
                            </ListItem>
                        {/each}
                    </List>
                </div>
            </ClickOutside>
        {/if}
    {/await}
</div>
