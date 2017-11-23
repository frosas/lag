import Pings from "./pings";
import User from "./user";
import util from "./util";

interface IConstructorParams {
  user: User;
  pings: Pings;
  element: Element;
}

export default class {
  constructor({ user, pings, element }: IConstructorParams) {
    user.events.on("read", () => {
      element.textContent = util.humanizeLag(pings.currentLag);
    });
  }
}
