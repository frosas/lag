import Pings from "./pings";
import User from "./user";
import util from "./util";

interface IParams {
  user: User;
  pings: Pings;
  element: Element;
}

export default ({ user, pings, element }: IParams) => {
  user.events.on("read", () => {
    element.textContent = util.humanizeLag(pings.currentLag);
  });
};
