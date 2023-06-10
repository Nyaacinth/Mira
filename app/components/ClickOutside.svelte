<script lang="ts">
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    function innerClickOutside(node: HTMLElement) {
        const handleClick = (event: MouseEvent) => {
            if (!node.contains(event.target as any)) {
                dispatch("click-outside")
            }
        }

        document.addEventListener("click", handleClick, true)

        return {
            destroy() {
                document.removeEventListener("click", handleClick, true)
            }
        }
    }
</script>

<div use:innerClickOutside>
    <slot />
</div>
