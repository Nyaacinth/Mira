<script lang="ts">
    import Button from "@smui/button"
    import Card, { Actions as CardActions } from "@smui/card"
    import IconButton from "@smui/icon-button"
    import List, { Item as ListItem, Text as ListText } from "@smui/list"
    import Menu from "@smui/menu"
    import Tooltip, { Wrapper as TooltipWrapper } from "@smui/tooltip"
    import { onDestroy } from "svelte"
    import { fade } from "svelte/transition"
    import audioContext from "../assets/audio/audioContext"
    import rainville from "../assets/audio/rainville"

    let menu: Menu // bind:this

    let trackNum = 5
    let paused = true

    let bufferSource = audioContext.createBufferSource()

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

<div data-tauri-drag-region class="relative h-100% flex flex-col bg-gray-300 justify-center items-center">
    <div class="grid">
        {#if paused}
            <div class="material-icons p-8 text-6xl text-gray-500 grid-item" transition:fade>cloud</div>
        {:else}
            <div class="material-icons p-8 text-6xl text-gray-700 grid-item" transition:fade>cloud</div>
        {/if}
    </div>
    <Card class="rounded-100">
        <CardActions>
            <IconButton class="material-icons" on:click={() => (paused = !paused)}>
                {paused ? "play_arrow" : "pause"}
            </IconButton>
            <div>
                <Button variant="outlined" class="rounded-100" on:click={() => menu.setOpen(true)}>
                    {rainville[trackNum][0]}
                </Button>
                <Menu bind:this={menu}>
                    <List>
                        {#each rainville as [trackName], index}
                            <ListItem on:SMUI:action={() => (trackNum = index)}>
                                <ListText>{trackName}</ListText>
                            </ListItem>
                        {/each}
                    </List>
                </Menu>
            </div>
        </CardActions>
    </Card>
    <TooltipWrapper>
        <div class="material-icons absolute bottom-2 right-2 p-2 text-gray-500">info_outline</div>
        <Tooltip xPos="start" yPos="above">且听细雨，勿湿衣襟</Tooltip>
    </TooltipWrapper>
</div>

<style lang="scss">
    .grid-item {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 2;
    }
</style>
