<script lang="ts">
    import Button from "@smui/button"
    import Card, { Actions as CardActions } from "@smui/card"
    import IconButton from "@smui/icon-button"
    import List, { Item as ListItem, Text as ListText } from "@smui/list"
    import Menu from "@smui/menu"
    import { onDestroy } from "svelte"
    import RainvillePlayer from "../models/RainvillePlayer"

    let className = ""
    export { className as class }
    export let style = ""

    const player = new RainvillePlayer()

    let menu: Menu // bind:this

    onDestroy(player.handleDestroy.bind(player))
</script>

<Card class={`rounded-100 ${className}`} {style}>
    <CardActions>
        <IconButton class="material-icons" on:click={() => (player.paused = !player.paused)}>
            {player.paused ? "play_arrow" : "pause"}
        </IconButton>
        <div>
            <Button variant="outlined" class="rounded-100" on:click={() => menu.setOpen(true)}>
                {player.currentTrack[0]}
            </Button>
            <Menu bind:this={menu}>
                <List>
                    {#each player.tracks as [trackName], index}
                        <ListItem on:SMUI:action={() => (player.trackNum = index)}>
                            <ListText>{trackName}</ListText>
                        </ListItem>
                    {/each}
                </List>
            </Menu>
        </div>
    </CardActions>
</Card>
