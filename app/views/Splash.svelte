<script lang="ts">
    import Tooltip, { Wrapper as TooltipWrapper } from "@smui/tooltip"
    import RainvillePlayerCard from "../components/RainvillePlayerCard.svelte"
</script>

<div data-tauri-drag-region class="relative h-100% flex flex-col bg-gray-300 justify-center items-center">
    <div class="material-icons p-8 text-6xl text-gray-500">cloud</div>
    <RainvillePlayerCard />
    <TooltipWrapper>
        <div class="material-icons absolute bottom-2 right-2 p-2 text-gray-500">info_outline</div>
        <Tooltip xPos="start" yPos="above">且听细雨，勿湿衣襟</Tooltip>
    </TooltipWrapper>
</div>
