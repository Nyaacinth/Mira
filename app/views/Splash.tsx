import { Component, For, Match, Show, Switch, createEffect, createResource, createSignal } from "solid-js"
import { Transition } from "solid-transition-group"
import { i18n } from "../assets/translations"
import { KeyboardArrowUpOutline } from "../components/svg+path/KeyboardArrowUpOutline"
import { PauseCircleOutline } from "../components/svg+path/PauseCircleOutline"
import { PlayCircleOutline } from "../components/svg+path/PlayCircleOutline"
import { RainyOutline } from "../components/svg+path/RainyOutline"
import { RainvillePlayer, createRainvillePlayer } from "../models/RainvillePlayer"

const LoadingSpinner: Component = () => (
    <div class="flex absolute w-100% h-100% justify-center items-center">
        <div class="w-10 mobile:w-15 h-10 mobile:h-15 border-5 mobile:border-7.5 rounded-50% border-[#FFFFFFAF_#FFFFFFAF_#4FAFFFAF_#FFFFFFAF] animate-spin animate-duration-1000" />
    </div>
)

const PlayerView: Component<{ rainvillePlayer: RainvillePlayer }> = (props) => {
    const tracks = () => props.rainvillePlayer.tracks

    const [paused, setPaused] = createSignal(true)
    createEffect(() => (props.rainvillePlayer.paused = paused()))

    const [trackNum, setTrackNum] = createSignal(5)
    createEffect(() => (props.rainvillePlayer.trackNum = trackNum()))

    const [menuIsOpened, setMenuIsOpened] = createSignal(false)

    return (
        <>
            <div data-tauri-drag-region class="flex flex-col absolute w-100% h-100% justify-center items-center">
                <svg
                    class="w-14 mobile:w-21 h-14 mobile:h-21 fill-current text-gray-500"
                    height="48"
                    viewBox="0 -960 960 960"
                    width="48"
                >
                    <RainyOutline />
                </svg>
                <div class="pb-4" />
                <button
                    class="bg-transparent rounded-full"
                    onClick={() => setPaused(!paused())}
                    disabled={menuIsOpened()}
                >
                    <svg
                        class="w-7.5 mobile:w-11.25 h-7.5 mobile:h-11.25 fill-current text-gray-500"
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
            <div class="flex absolute bottom-0 p-3 mobile:p-4.5 w-100% justify-center items-center">
                <button
                    class="bg-transparent"
                    onClick={() => setMenuIsOpened(!menuIsOpened())}
                    disabled={menuIsOpened()}
                >
                    <svg
                        class="w-7.5 mobile:w-11.25 h-7.5 mobile:h-11.25 fill-current text-gray-500"
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
                        <div class="absolute bottom-0 w-100% h-50% overflow-scroll bg-[#FFFFFC] rounded-t-lg border-0.5 border-[#EFEFCF] drop-shadow-2xl drop-shadow-color-[#00103026] px-2 mobile:px-2.5 py-2.5 mobile:py-3.125">
                            <For each={tracks()}>
                                {(track, index) => (
                                    <div
                                        role="button"
                                        class="px-2 mobile:px-2.5 py-2.5 mobile:py-3.125"
                                        onClick={() => setTrackNum(index())}
                                    >
                                        <span
                                            class="text-gray-700 font-300 text-16px mobile:text-20px"
                                            classList={{
                                                ["after:content-['✓'] after:text-sm after:mobile:text-lg after:absolute after:right-4"]:
                                                    trackNum() === index()
                                            }}
                                        >
                                            {i18n().t(track[0])}
                                        </span>
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>
                </Show>
            </Transition>
        </>
    )
}

export const Splash: Component = () => {
    const [rainvillePlayerResource] = createResource(createRainvillePlayer)
    createEffect(() => rainvillePlayerResource.error && location.reload())

    return (
        <div class="relative w-100% h-100% bg-gray-300">
            <Switch>
                <Match when={rainvillePlayerResource.loading}>
                    <LoadingSpinner />
                </Match>
                <Match when={rainvillePlayerResource.latest}>
                    <PlayerView rainvillePlayer={rainvillePlayerResource.latest!} />
                </Match>
            </Switch>
        </div>
    )
}
