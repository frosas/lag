import React from "react";
import ReactDOM from "react-dom";
import ControlsComponent from "./components/controls";
import Audio from ".";
import PersistedVolume from "./PersistedVolume";

type ConstructorParams = {
  audio: Audio;
  domElement: Element;
};

export default class AudioControls {
  constructor({ audio, domElement }: ConstructorParams) {
    const persistedVolume = new PersistedVolume(audio);

    const onChangeVolume = (volume: number) => {
      audio.setVolume(volume);
      persistedVolume.save(volume);
    };

    ReactDOM.render(
      <ControlsComponent
        initialVolume={audio.getVolume()}
        onChangeVolume={onChangeVolume}
      />,
      domElement
    );
  }
}
