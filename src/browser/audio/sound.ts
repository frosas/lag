export type Sound = {
  /** The last slider position above 0. Only the slider changes it. */
  volume: number
  isMuted: boolean
  /** The browser keeps the audio from playing although the user wants it. */
  isBlocked: boolean
}

export const defaultVolume = 0.25

/** Unmuting with the button restores at least this, so the sound is audible */
export const minUnmutedVolume = 0.1

export const isSoundOn = (sound: Sound) => !sound.isMuted && !sound.isBlocked

/** The slider shows 0 while muted, without forgetting the volume. */
export const getDisplayedVolume = (sound: Sound) =>
  isSoundOn(sound) ? sound.volume : 0

type Stored = { volume: number | undefined; isMuted: boolean | undefined }

/** Starts blocked when it wants sound: the browser must confirm it plays. */
export const buildInitialSound = (stored: Stored): Sound => {
  const volume = stored.volume ?? defaultVolume
  const isMuted =
    stored.isMuted ?? (stored.volume === undefined || volume === 0)
  return { volume, isMuted, isBlocked: !isMuted && volume > 0 }
}

export const toggleMute = (sound: Sound): Sound =>
  isSoundOn(sound)
    ? { ...sound, isMuted: true }
    : {
        volume: Math.max(sound.volume, minUnmutedVolume),
        isMuted: false,
        isBlocked: false,
      }

/** Sliding to 0 mutes, like the button, and keeps the volume to restore. */
export const changeVolume = (sound: Sound, volume: number): Sound =>
  volume === 0
    ? { ...sound, isMuted: true, isBlocked: false }
    : { volume, isMuted: false, isBlocked: false }

export const confirmPlaying = (sound: Sound): Sound => ({
  ...sound,
  isBlocked: false,
})

/** The browser stopped the audio, not the user. */
export const reportStopped = (sound: Sound): Sound =>
  sound.isMuted ? sound : { ...sound, isBlocked: true }
