import React from "react";
import ReactDOM from "react-dom";
import ControlsComponent from "./Component";
import Audio from "./Audio";
import PersistedVolume from "./PersistedVolume";

type ConstructorParams = {
  audio: Audio;
  domElement: Element;
};

export default class Controls {
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
