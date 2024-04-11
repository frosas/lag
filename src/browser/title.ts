import Pings from "./pings"
import User from "./user"
import { humanizeLag } from "./util"

interface ConstructorParams {
  user: User
  pings: Pings
  element: Element
}

export default class {
  constructor({ user, pings, element }: ConstructorParams) {
    user.events.on("read", () => {
      element.textContent = humanizeLag(pings.currentLag)
    })
  }
}
