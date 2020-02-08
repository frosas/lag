import Pings from "./Pings";
import User from "./User";
import { humanizeLag } from "./util";

interface ConstructorParams {
  user: User;
  pings: Pings;
  element: Element;
}

export default class {
  constructor({ user, pings, element }: ConstructorParams) {
    user.events.on("read", () => {
      element.textContent = humanizeLag(pings.currentLag);
    });
  }
}
