import { polarity } from "../../universal/math"
import Pings from "../pings"
import User from "../user"
import createNoiseBufferSource from "./create-noise-buffer-source"

export default class AudioProcessing {
  private _context = new AudioContext()
  private _gain = this._context.createGain()

  constructor(user: User, pings: Pings) {
    this._gain.connect(this._context.destination)

    const filter = this._context.createBiquadFilter()
    filter.frequency.value = 100
    filter.Q.value = 0
    filter.connect(this._gain)

    createNoiseBufferSource(this._context).connect(filter)

    const maxFrequency = 800
    const maxFrequencyIncrement = 30
    user.events.on("hear", () => {
      const from = filter.frequency.value
      let to = pings.currentLag
      to = Math.min(to, maxFrequency)
      let increment = to - from
      increment =
        Math.min(Math.abs(increment), maxFrequencyIncrement) *
        polarity(increment)
      filter.frequency.value += increment
    })

    this.setVolume(0)
  }

  getVolume = () => this._gain.gain.value

  setVolume = (volume: number) => {
    this._gain.gain.value = volume
    // Save processor/battery when possible
    if (volume) {
      this._context.resume()
    } else {
      this._context.suspend()
    }
  }
}
