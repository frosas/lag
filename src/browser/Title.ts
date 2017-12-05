import Pings from "./Pings";
import User from "./User";
import { humanizeLag } from "./util";

interface IConstructorParams {
  user: User;
  pings: Pings;
  element: Element;
}

export default class {
  constructor({ user, pings, element }: IConstructorParams) {
    user.events.on("read", () => {
      element.textContent = humanizeLag(pings.currentLag);
    });
  }
}
