import { Sound } from "./sound"

export default class PersistedSound {
  load = () => {
    const volume = localStorage?.getItem("volume")
    const isMuted = localStorage?.getItem("isMuted")
    return {
      volume: volume ? parseFloat(volume) : undefined,
      isMuted: isMuted ? isMuted === "true" : undefined,
    }
  }

  save = ({ volume, isMuted }: Sound) => {
    if (!localStorage) return
    localStorage.setItem("volume", volume.toString())
    localStorage.setItem("isMuted", isMuted.toString())
  }
}
