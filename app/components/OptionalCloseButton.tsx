import { getCurrentWindow } from "@tauri-apps/api/window"
import { platform } from "@tauri-apps/plugin-os"
import { Component, createMemo, Show } from "solid-js"
import { CloseSmallRounded } from "./svg+path/CloseSmallRounded"

export const OptionalCloseButton: Component = () => {
    const isWin = createMemo(() => platform() == "windows")

    return (
        <Show when={isWin()}>
            <div
                class="z-9999 fixed right-2 top-2 text-black w-min h-min bg-[#0000000F] rounded-[9999px]"
                onClick={() => getCurrentWindow().close()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <CloseSmallRounded />
                </svg>
            </div>
        </Show>
    )
}
