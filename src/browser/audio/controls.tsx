import React from "react"
import { createRoot } from "react-dom/client"
import ControlsComponent from "./components/controls"
import PersistedVolume from "./persisted-volume"
import AudioProcessing from "./processing"

type ConstructorParams = {
  audioProcessing: AudioProcessing
  domElement: Element
}

export default class AudioControls {
  constructor({ audioProcessing, domElement }: ConstructorParams) {
    const persistedVolume = new PersistedVolume(audioProcessing)

    const onChangeVolume = (volume: number) => {
      audioProcessing.setVolume(volume)
      persistedVolume.save(volume)
    }

    createRoot(domElement).render(
      <ControlsComponent
        initialVolume={audioProcessing.getVolume()}
        onChangeVolume={onChangeVolume}
      />,
    )
  }
}
