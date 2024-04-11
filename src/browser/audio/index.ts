import User from "../user"
import Pings from "../pings"
import AudioProcessing from "./processing"
import AudioControls from "./controls"

type ConstructorParams = {
  user: User
  pings: Pings
  domElement: Element
}

export default class Audio {
  constructor({ user, pings, domElement }: ConstructorParams) {
    new AudioControls({
      audioProcessing: new AudioProcessing(user, pings),
      domElement,
    })
  }
}
