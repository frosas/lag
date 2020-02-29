import { polarity } from "../../universal/math";
import createNoiseBufferSource from "./createNoiseBufferSource";
import Pings from "../Pings";
import User from "../User";

export default class Audio {
  private _context = new AudioContext();
  private _gain = this._context.createGain();

  constructor(user: User, pings: Pings) {
    this._gain.connect(this._context.destination);

    const filter = this._context.createBiquadFilter();
    filter.frequency.value = 100;
    filter.Q.value = 0;
    filter.connect(this._gain);

    createNoiseBufferSource(this._context).connect(filter);

    const maxFrequency = 800;
    const maxFrequencyIncrement = 30;
    user.events.on("hear", () => {
      const from = filter.frequency.value;
      let to = pings.currentLag;
      to = Math.min(to, maxFrequency);
      let increment = to - from;
      increment =
        Math.min(Math.abs(increment), maxFrequencyIncrement) *
        polarity(increment);
      filter.frequency.value += increment;
    });

    this.setVolume(0);
  }

  getVolume = () => this._gain.gain.value;

  setVolume = (volume: number) => {
    this._gain.gain.value = volume;
    // Save processor/battery when possible
    volume ? this._context.resume() : this._context.suspend();
  };
}
