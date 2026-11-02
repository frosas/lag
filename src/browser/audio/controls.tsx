import React from "react"
import { createRoot } from "react-dom/client"
import ControlsComponent from "./components/controls"
import PersistedSound from "./persisted-sound"
import AudioProcessing from "./processing"
import {
  Sound,
  buildInitialSound,
  changeVolume,
  confirmPlaying,
  getDisplayedVolume,
  reportStopped,
  toggleMute,
} from "./sound"

type ConstructorParams = {
  audioProcessing: AudioProcessing
  domElement: Element
}

export default class AudioControls {
  constructor({ audioProcessing, domElement }: ConstructorParams) {
    const persistedSound = new PersistedSound()
    const root = createRoot(domElement)
    let sound = buildInitialSound(persistedSound.load())

    const render = () =>
      root.render(
        <ControlsComponent
          volume={getDisplayedVolume(sound)}
          isMuted={sound.isMuted}
          isBlocked={sound.isBlocked}
          onToggleMute={() => applyUserChange(toggleMute(sound))}
          onChangeVolume={(volume) =>
            applyUserChange(changeVolume(sound, volume))
          }
        />,
      )

    const setSound = (newSound: Sound) => {
      sound = newSound
      render()
    }

    const startOrStopAudio = () => {
      audioProcessing.setVolume(sound.volume)
      if (sound.isMuted) {
        void audioProcessing.suspend()
      } else {
        void audioProcessing
          .resume()
          .then(() => setSound(confirmPlaying(sound)))
      }
    }

    // The audio starts here, synchronously, so it counts as part of the user
    // gesture. Safari requires it.
    const applyUserChange = (newSound: Sound) => {
      persistedSound.save(newSound)
      setSound(newSound)
      startOrStopAudio()
    }

    audioProcessing.onStopped(() => setSound(reportStopped(sound)))
    startOrStopAudio()
    render()
  }
}
