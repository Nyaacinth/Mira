import audio0 from "./0.wav"
import audio1 from "./1.wav"
import audio2 from "./2.wav"
import audio3 from "./3.wav"
import audio4 from "./4.wav"
import audio5 from "./5.wav"
import audio6 from "./6.wav"
import audio7 from "./7.wav"
import audio8 from "./8.wav"
import audio9 from "./9.wav"

import audioContext from "../audioContext"

const audioBuffers: AudioBuffer[] = []
await Promise.all(
    [audio0, audio1, audio2, audio3, audio4, audio5, audio6, audio7, audio8, audio9].map(async (audioURL, index) => {
        const response = await fetch(audioURL)
        const arrayBuffer = await response.arrayBuffer()
        audioBuffers[index] = await audioContext.decodeAudioData(arrayBuffer)
    })
)

export default audioBuffers
