import audioContext from "../audioContext"

const audioBuffers: AudioBuffer[] = []
export default Promise.all(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        .map((num) => new URL(`./${num}.wav`, import.meta.url))
        .map(async (audioURL, index) => {
            const response = await fetch(audioURL)
            const arrayBuffer = await response.arrayBuffer()
            audioBuffers[index] = await audioContext.decodeAudioData(arrayBuffer)
        })
).then(
    () =>
        [
            ["audio0Label", audioBuffers[0]!],
            ["audio1Label", audioBuffers[1]!],
            ["audio2Label", audioBuffers[2]!],
            ["audio3Label", audioBuffers[3]!],
            ["audio4Label", audioBuffers[4]!],
            ["audio5Label", audioBuffers[5]!],
            ["audio6Label", audioBuffers[6]!],
            ["audio7Label", audioBuffers[7]!],
            ["audio8Label", audioBuffers[8]!],
            ["audio9Label", audioBuffers[9]!]
        ] as const
)
