<script lang="ts">
    import { onDestroy } from "svelte"
    import audioContext from "./assets/audio/audioContext"
    import rainville from "./assets/audio/rainville"

    let bufferSource = audioContext.createBufferSource()
    let trackNum = 0
    let paused = true

    $: {
        if (bufferSource.buffer) bufferSource.stop()
        bufferSource.disconnect()
        if (!paused) {
            bufferSource = audioContext.createBufferSource()
            bufferSource.loop = true
            bufferSource.buffer = rainville[trackNum]
            bufferSource.connect(audioContext.destination)
            bufferSource.start()
        }
    }

    onDestroy(() => {
        if (bufferSource.buffer) bufferSource.stop()
        bufferSource.disconnect()
    })
</script>

<div data-tauri-drag-region class="relative flex-1 justify-center items-center bg-#05774821">
    <div class="absolute right--2 bottom--2 font-100 text-8xl text-#05774880">雨</div>
    <button on:click={() => (paused = !paused)} class="p-8 text-6xl text-dark">
        {paused ? "▶" : "⏸"}
    </button>
    <form>
        <label for="sound-select">音</label>
        <select
            id="sound-select"
            on:change={(e) => {
                trackNum = parseInt(e.currentTarget.value, 10)
            }}
            style="appearance: none;"
            class="px-2 bg-transparent rounded-md"
        >
            {#each rainville as _, index}
                <option value={index}>Type {index}</option>
            {/each}
        </select>
    </form>
</div>
