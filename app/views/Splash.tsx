import { Component, For, Match, Show, Switch, createEffect, createResource, createSignal } from "solid-js"
import { Transition } from "solid-transition-group"
import { i18n } from "../assets/translations"
import { KeyboardArrowUpOutline } from "../components/svg+path/KeyboardArrowUpOutline"
import { PauseCircleOutline } from "../components/svg+path/PauseCircleOutline"
import { PlayCircleOutline } from "../components/svg+path/PlayCircleOutline"
import { RainyOutline } from "../components/svg+path/RainyOutline"
import { createRainvillePlayer } from "../models/RainvillePlayer"

const LoadingSpinner: Component = () => (
    <div class="flex absolute w-100% h-100% justify-center items-center">
        <div class="w-10 h-10 border-5 rounded-50% border-[#FFFFFFAF_#FFFFFFAF_#4FAFFFAF_#FFFFFFAF] animate-spin animate-duration-1000" />
    </div>
)

export const Splash: Component = () => {
    const [rainvillePlayerResource] = createResource(createRainvillePlayer)
    createEffect(() => rainvillePlayerResource.error && location.reload())

    const [paused, setPaused] = createSignal(true)
    createEffect(() => {
        if (!rainvillePlayerResource.loading && !rainvillePlayerResource.error && rainvillePlayerResource.latest) {
            rainvillePlayerResource.latest.paused = paused()
        }
    })

    const [menuIsOpened, setMenuIsOpened] = createSignal(false)

    return (
        <div class="relative w-100% h-100% bg-gray-300">
            <Switch>
                <Match when={rainvillePlayerResource.loading}>
                    <LoadingSpinner />
                </Match>
                <Match when={rainvillePlayerResource.latest}>
                    <div
                        data-tauri-drag-region
                        class="flex flex-col absolute w-100% h-100% justify-center items-center"
                    >
                        <svg
                            class="w-14 h-14 fill-current text-gray-500"
                            height="48"
                            viewBox="0 -960 960 960"
                            width="48"
                        >
                            <RainyOutline />
                        </svg>
                        <div class="pb-4" />
                        <button class="bg-transparent" onClick={() => setPaused(!paused())} disabled={menuIsOpened()}>
                            <svg
                                class="w-7.5 h-7.5 fill-current text-gray-500"
                                height="48"
                                viewBox="0 -960 960 960"
                                width="48"
                            >
                                <Show when={paused()} fallback={<PauseCircleOutline />}>
                                    <PlayCircleOutline />
                                </Show>
                            </svg>
                        </button>
                    </div>
                    <div class="flex absolute bottom-0 p-3 w-100% justify-center items-center">
                        <button
                            class="bg-transparent"
                            onClick={() => setMenuIsOpened(!menuIsOpened())}
                            disabled={menuIsOpened()}
                        >
                            <svg
                                class="w-7.5 h-7.5 fill-current text-gray-500"
                                height="48"
                                viewBox="0 -960 960 960"
                                width="48"
                            >
                                <KeyboardArrowUpOutline />
                            </svg>
                        </button>
                    </div>
                    <Transition
                        onEnter={(el, done) => {
                            const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
                                duration: 300
                            })
                            const b = el.children[0]!.animate(
                                [{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }],
                                {
                                    duration: 300,
                                    easing: "ease-out"
                                }
                            )
                            Promise.all([a.finished, b.finished]).then(done)
                        }}
                        onExit={(el, done) => {
                            const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
                                duration: 300
                            })
                            const b = el.children[0]!.animate(
                                [{ transform: "translateY(0%)" }, { transform: "translateY(100%)" }],
                                {
                                    duration: 300,
                                    easing: "ease-in"
                                }
                            )
                            Promise.all([a.finished, b.finished]).then(done)
                        }}
                    >
                        <Show when={menuIsOpened()}>
                            <div
                                data-tauri-drag-region
                                class="absolute w-100% h-100% bg-[#00103033] focus:bg-[#00103066]"
                                style="-webkit-tap-highlight-color: #00000000;"
                                role="button"
                                tabindex={0}
                                onClick={() => setMenuIsOpened(false)}
                            >
                                <div class="absolute bottom-0 w-100% h-50% overflow-scroll bg-[#FFFFFC] rounded-t-lg border-0.5 border-[#EFEFCF] drop-shadow-2xl drop-shadow-color-[#00103026] py-2.5 px-2">
                                    <For each={rainvillePlayerResource.latest!.tracks}>
                                        {(track, index) => (
                                            <div
                                                role="button"
                                                class="py-2.5 px-2"
                                                onClick={() => (rainvillePlayerResource.latest!.trackNum = index())}
                                            >
                                                <span class="text-gray-700 font-300">{i18n().t(track[0])}</span>
                                            </div>
                                        )}
                                    </For>
                                </div>
                            </div>
                        </Show>
                    </Transition>
                </Match>
            </Switch>
        </div>
    )
}
