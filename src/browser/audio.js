import math from "../universal/math";
import createNoiseBufferSource from "./audio/createNoiseBufferSource";

export default class Audio {
  constructor(user, pings) {
    const context = new AudioContext();
    const gain = context.createGain();
    gain.connect(context.destination);

    const filter = context.createBiquadFilter();
    filter.frequency.value = 100;
    filter.Q.value = 0;
    filter.connect(gain);

    createNoiseBufferSource(context).connect(filter);

    const maxFrequency = 800;
    const maxFrequencyIncrement = 30;
    user.events.on("hear", () => {
      const from = filter.frequency.value;
      let to = pings.currentLag;
      to = Math.min(to, maxFrequency);
      let increment = to - from;
      increment =
        Math.min(Math.abs(increment), maxFrequencyIncrement) *
        math.polarity(increment);
      filter.frequency.value += increment;
    });

    return {
      setVolume: volume => {
        gain.gain.value = volume;
        // Save processor/battery when possible
        parseFloat(volume) ? context.resume() : context.suspend();
      },
      getVolume: () => gain.gain.value
    };
  }
}
