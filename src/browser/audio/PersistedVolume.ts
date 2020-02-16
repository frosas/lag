import Audio from "./Audio";

export default class PersistedVolume {
  constructor(audio: Audio) {
    const savedVolume = localStorage && localStorage.getItem("volume");
    if (savedVolume) audio.setVolume(parseFloat(savedVolume));
  }

  save = (volume: number) => {
    if (localStorage) localStorage.setItem("volume", volume.toString());
  };
}
