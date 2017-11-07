export default audioContext => {
  const lengthInSeconds = 5;
  const buffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate * lengthInSeconds,
    audioContext.sampleRate
  );
  const data = buffer.getChannelData(0);
  for (let i = data.length; i; i -= 1) data[i] = Math.random() * 2 - 1;

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.start(0);
  return source;
};
