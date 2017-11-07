import math from "../universal/math";

function Noise(context) {
  const lengthInSeconds = 5;
  const buffer = context.createBuffer(
    1,
    context.sampleRate * lengthInSeconds,
    context.sampleRate
  );
  const data = buffer.getChannelData(0);
  for (let i = data.length; i; i -= 1) data[i] = Math.random() * 2 - 1;

  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.start(0);
  return source;
}

export default class Audio {
  constructor(user, pings) {
    const context = new AudioContext();
    const gain = context.createGain();
    gain.connect(context.destination);

    const filter = context.createBiquadFilter();
    filter.frequency.value = 100;
    filter.Q.value = 0;
    filter.connect(gain);

    new Noise(context).connect(filter);

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
      setVolume: volume => (gain.gain.value = volume),
      getVolume: () => gain.gain.value
    };
  }
}
