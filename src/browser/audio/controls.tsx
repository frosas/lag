import React from "react"
import ReactDOM from "react-dom"
import ControlsComponent from "./components/controls"
import AudioProcessing from "./processing"
import PersistedVolume from "./persisted-volume"

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

    ReactDOM.render(
      <ControlsComponent
        initialVolume={audioProcessing.getVolume()}
        onChangeVolume={onChangeVolume}
      />,
      domElement,
    )
  }
}
