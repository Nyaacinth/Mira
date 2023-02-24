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

export default [
    ["深邃", audioBuffers[0]],
    ["乌云", audioBuffers[2]],
    ["夏日", audioBuffers[3]],
    ["点滴", audioBuffers[4]],
    ["清润", audioBuffers[5]],
    ["都市", audioBuffers[6]],
    ["阳台", audioBuffers[7]],
    ["淅沥", audioBuffers[8]],
    ["噪音", audioBuffers[9]]
] as const
