import Pings from "./pings";
import User from "./user";
import util from "./util";

interface IParams {
  user: User;
  pings: Pings;
  domElement: Element;
}

export default ({ user, pings, domElement }: IParams) => {
  user.events.on("read", () => {
    domElement.textContent = util.humanizeLag(pings.currentLag);
  });
};
