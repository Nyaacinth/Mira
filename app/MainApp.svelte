<script lang="ts">
    import { onDestroy } from "svelte"
    import IconPause from "~icons/mdi/pause"
    import IconPlay from "~icons/mdi/play"
    import audioContext from "./assets/audio/audioContext"
    import rainville from "./assets/audio/rainville"

    let bufferSource = audioContext.createBufferSource()
    let trackNum = 5
    let paused = true

    $: {
        if (bufferSource.buffer) bufferSource.stop()
        bufferSource.disconnect()
        if (!paused) {
            bufferSource = audioContext.createBufferSource()
            bufferSource.loop = true
            bufferSource.buffer = rainville[trackNum][1]
            bufferSource.connect(audioContext.destination)
            bufferSource.start()
        }
    }

    onDestroy(() => {
        if (bufferSource.buffer) bufferSource.stop()
        bufferSource.disconnect()
    })
</script>

<div data-tauri-drag-region class="relative flex-1 justify-center items-start bg-#05774821 overflow-hidden">
    <div class="absolute right--2 bottom--2 font-100 text-8xl text-#05774844 pointer-events-none">雨</div>
    <div data-tauri-drag-region class="items-center">
        <button on:click={() => (paused = !paused)} class="px-8 py-4 w-min h-min text-6xl text-dark">
            {#if paused}
                <IconPause />
            {:else}
                <IconPlay />
            {/if}
        </button>
        <select
            on:change={(e) => {
                trackNum = parseInt(e.currentTarget.value, 10)
            }}
            style="appearance: none;"
            class="bg-transparent rounded-md"
        >
            {#each rainville as [typeName], index}
                <option value={index} selected={index == trackNum}>{typeName}</option>
            {/each}
        </select>
    </div>
</div>
