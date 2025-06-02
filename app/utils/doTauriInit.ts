import { getCurrentWindow } from "@tauri-apps/api/window"

const editableSelectors = [
    'input[type="text"]',
    'input[type="password"]',
    'input[type="email"]',
    'input[type="tel"]',
    'input[type="url"]',
    'input[type="search"]',
    'input[type="number"]',
    "input:not([type])",
    "textarea",
    '[contenteditable="true"]'
]

// Paired with <div id="root" style="display: contents" />
const webviewNativefyCSS = `
    html {
        overscroll-behavior: none;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
    }
    @supports (height: 100dvh) and (width: 100dvw) {
        html {
            width: 100dvw;
            height: 100dvh;
        }
    }
    body {
        overflow: auto;
        width: 100%;
        height: 100%;
    }
    html {
        -webkit-user-select: none;
        user-select: none;
        cursor: default;
    }
    ${editableSelectors.join(", ")} {
        -webkit-user-select: text;
        user-select: text;
        cursor: text;
    }
`
    .replaceAll(/\s+/g, " ")
    .trim()

function isEditableElement(elm: HTMLElement) {
    for (const selector of editableSelectors) {
        if (elm.matches(selector)) {
            return true
        }
    }
    return false
}

/** @returns Cleanup function */
export function doTauriInit(): () => void {
    // Inject stylesheet that nativefies tauri webview
    const styleElement = document.createElement("style")
    styleElement.innerHTML = webviewNativefyCSS
    document.head.appendChild(styleElement)

    // Disable F5, Ctrl+R, and Cmd+R from reloading the page
    function keydownHandler(event: KeyboardEvent) {
        if (event.key === "F5" || (event.ctrlKey && event.key === "r") || (event.metaKey && event.key === "r")) {
            event.preventDefault()
        }
    }
    document.addEventListener("keydown", keydownHandler)

    // Only allow context menu on editable elements
    function contextMenuHandler(event: MouseEvent) {
        if (isEditableElement(event.target as HTMLElement)) return
        event.preventDefault()
    }
    document.addEventListener("contextmenu", contextMenuHandler)

    // Paired with `"visible": false` in `tauri.conf.json` to show window after page loaded to avoid flickers
    const thisWindow = getCurrentWindow()
    thisWindow.show()
    thisWindow.setFocus()

    return () => {
        // Remove the injected stylesheet
        if (styleElement.parentNode === document.head) {
            document.head.removeChild(styleElement)
        }

        // Remove event listeners
        document.removeEventListener("keydown", keydownHandler)
        document.removeEventListener("contextmenu", contextMenuHandler)
    }
}
