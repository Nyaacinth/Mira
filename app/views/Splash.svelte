<script lang="ts">
    import Button from "@smui/button"
    import IconButton from "@smui/icon-button"
    import List, { Item as ListItem, Text as ListText } from "@smui/list"
    import Menu from "@smui/menu"
    import { onDestroy } from "svelte"
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

<div>
    <IconButton class="material-icons" on:click={() => (paused = !paused)}>
        {paused ? "play_arrow" : "pause"}
    </IconButton>
    <div>
        <Button variant="outlined" on:click={() => menu.setOpen(true)}>{rainville[trackNum][0]}</Button>
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
</div>
