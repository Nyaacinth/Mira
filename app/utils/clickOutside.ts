/** Simple use directive to detect clicking outside, the on:click will be triggered with detail 1024 */
export function clickOutside(node: HTMLElement) {
    const handleClick = (event: any) => {
        if (!node.contains(event.target)) {
            node.dispatchEvent(
                new CustomEvent("click", {
                    detail: 1024
                })
            )
        }
    }

    document.addEventListener("click", handleClick, true)

    return {
        destroy() {
            document.removeEventListener("click", handleClick, true)
        }
    }
}
