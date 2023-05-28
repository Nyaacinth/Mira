/** Simple use directive to detect clicking outside, the event `outclick` will be triggered */
export function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
        if (!node.contains(event.target as any)) {
            node.dispatchEvent(new CustomEvent("outclick"))
        }
    }

    document.addEventListener("click", handleClick, true)

    return {
        destroy() {
            document.removeEventListener("click", handleClick, true)
        }
    }
}
