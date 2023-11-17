import { Component, For, Match, Show, Switch, createEffect, createResource, createSignal } from "solid-js"
import { Transition } from "solid-transition-group"
import { i18n } from "../assets/translations"
import { KeyboardArrowUpOutline } from "../components/svg+path/KeyboardArrowUpOutline"
import { PauseCircleOutline } from "../components/svg+path/PauseCircleOutline"
import { PlayCircleOutline } from "../components/svg+path/PlayCircleOutline"
import { RainyOutline } from "../components/svg+path/RainyOutline"
import { RainvillePlayer, createRainvillePlayer } from "../models/RainvillePlayer"

const LoadingSpinner: Component = () => (
    <div class="flex absolute w-full h-full justify-center items-center">
        <div class="w-[20vmin] h-[20vmin] border-8 rounded-full border-[#FFFFFFAF_#FFFFFFAF_#4FAFFFAF_#FFFFFFAF] animate-spin" />
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
            <div data-tauri-drag-region class="flex flex-col absolute w-full h-full justify-center items-center">
                <svg
                    class="w-14 mobile:w-[6rem] h-14 mobile:h-[6rem] fill-current text-gray-500"
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
                        class="w-8 mobile:w-12 h-8 mobile:h-12 fill-current text-gray-500"
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
            <div class="flex absolute bottom-0 p-3 mobile:p-5 w-full justify-center items-center">
                <button
                    class="bg-transparent"
                    onClick={() => setMenuIsOpened(!menuIsOpened())}
                    disabled={menuIsOpened()}
                >
                    <svg
                        class="w-8 mobile:w-12 h-8 mobile:h-12 fill-current text-gray-500"
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
                        class="absolute w-full h-full bg-[#00103033] focus:bg-[#00103066]"
                        style="-webkit-tap-highlight-color: #00000000;"
                        role="button"
                        tabindex={0}
                        onClick={() => setMenuIsOpened(false)}
                    >
                        <div class="absolute bottom-0 w-full h-[50%] overflow-scroll bg-[#FFFFFC] rounded-t-lg border-1 border-[#EFEFCF] drop-shadow-2xl px-2 mobile:px-3 py-3 mobile:py-4">
                            <For each={tracks()}>
                                {(track, index) => (
                                    <div
                                        role="button"
                                        class="px-2 mobile:px-3 py-3 mobile:py-4"
                                        onClick={() => setTrackNum(index())}
                                    >
                                        <span
                                            class="text-gray-700 font-light text-[16px] mobile:text-[20px]"
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
        <div class="relative w-full h-full bg-gray-300">
            <Switch>
                <Match when={rainvillePlayerResource.loading}>
                    <LoadingSpinner />
                </Match>
                <Match when={rainvillePlayerResource.latest}>
                    {(rainvillePlayer) => <PlayerView rainvillePlayer={rainvillePlayer()} />}
                </Match>
            </Switch>
        </div>
    )
}
