import audioContext from "../audioContext"

const audioBuffers: AudioBuffer[] = []
await Promise.all(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        .map((num) => new URL(`./${num}.wav`, import.meta.url))
        .map(async (audioURL, index) => {
            const response = await fetch(audioURL)
            const arrayBuffer = await response.arrayBuffer()
            audioBuffers[index] = await audioContext.decodeAudioData(arrayBuffer)
        })
)

export default audioBuffers
