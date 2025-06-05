import audioContext from "../audioContext"

export default new Promise<AudioBuffer>(async (resolve, reject) => {
    try {
        const response = await fetch(new URL(`./rain.wav`, import.meta.url))
        const arrayBuffer = await response.arrayBuffer()
        resolve(await audioContext.decodeAudioData(arrayBuffer))
    } catch (e) {
        reject(e)
    }
})
