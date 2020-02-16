import React from "react";
import ReactDOM from "react-dom";
import ControlsComponent from "./Component";
import Audio from "./Audio";

export default class Controls {
  private _audio: Audio;

  constructor(audio: Audio) {
    this._audio = audio;

    const savedVolume = localStorage && localStorage.getItem("volume");
    if (savedVolume) audio.setVolume(parseFloat(savedVolume));

    ReactDOM.render(
      <ControlsComponent
        initialVolume={audio.getVolume()}
        onChangeVolume={this._onChangeVolume}
      />,
      document.querySelector("#controls-placeholder")
    );
  }

  private _onChangeVolume = (volume: number) => {
    this._audio.setVolume(volume);
    if (localStorage) localStorage.setItem("volume", volume.toString());
  };
}
