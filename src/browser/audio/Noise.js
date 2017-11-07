export default class {
  constructor(context) {
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
}
