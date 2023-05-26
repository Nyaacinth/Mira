import audioContext from "../assets/audio/audioContext"
import rainville from "../assets/audio/rainville"

/** Rainville Player Class */
export default class RainvillePlayer {
    /** Current Buffer Source, will be overwritten when handling change */
    private currentBufferSource = audioContext.createBufferSource()

    /** Private Paused Status */
    private _paused = true

    /** Public Paused Status, set it will trigger handleChange() */
    get paused() {
        return this._paused
    }
    set paused(value) {
        this._paused = value
        this.handleChange()
    }

    /** Private Track Number */
    private _trackNum = 5

    /** Public Track Number, set it will trigger handleChange() */
    get trackNum() {
        return this._trackNum
    }
    set trackNum(value) {
        this._trackNum = value
        this.handleChange()
    }

    /** Current Track Object */
    get currentTrack() {
        return rainville[this._trackNum]
    }

    /** All Playable Track */
    get tracks() {
        return rainville
    }

    /** Change Handler, it will overwrite currentBufferSource and restart it to change the track, uses handleDestory internally */
    private handleChange() {
        this.handleDestroy()
        if (!this._paused) {
            this.currentBufferSource = audioContext.createBufferSource()
            this.currentBufferSource.loop = true
            this.currentBufferSource.buffer = rainville[this._trackNum][1]
            this.currentBufferSource.connect(audioContext.destination)
            this.currentBufferSource.start()
        }
    }

    /** Player Destory Handler, you must call it to stop the rain sound and free the memory */
    handleDestroy() {
        if (this.currentBufferSource.buffer) this.currentBufferSource.stop()
        this.currentBufferSource.disconnect()
    }
}
