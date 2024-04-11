const createNoiseBuffer = (audioContext: AudioContext) => {
  const lengthInSeconds = 5
  const buffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate * lengthInSeconds,
    audioContext.sampleRate,
  )
  const data = buffer.getChannelData(0)
  for (let i = data.length; i; i -= 1) data[i] = Math.random() * 2 - 1
  return buffer
}

export default (audioContext: AudioContext) => {
  const source = audioContext.createBufferSource()
  source.buffer = createNoiseBuffer(audioContext)
  source.loop = true
  source.start(0)
  return source
}
