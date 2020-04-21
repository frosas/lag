import AudioProcessing from "./processing";

export default class PersistedVolume {
  constructor(audioProcessing: AudioProcessing) {
    const savedVolume = localStorage && localStorage.getItem("volume");
    if (savedVolume) audioProcessing.setVolume(parseFloat(savedVolume));
  }

  save = (volume: number) => {
    if (localStorage) localStorage.setItem("volume", volume.toString());
  };
}
