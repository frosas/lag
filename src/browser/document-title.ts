import Pings from "./pings";
import User from "./user";
import { humanizeLag } from "./util";

export default class {
  constructor(user: User, pings: Pings) {
    const original = document.title;
    user.events.on("read", () => {
      document.title = `${humanizeLag(pings.currentLag)} - ${original}`;
    });
  }
}
