import util from "./util";

export default class {
  constructor(user, pings) {
    const original = document.title;
    user.events.on("read", () => {
      document.title = `${util.humanizeLag(pings.currentLag)} - ${original}`;
    });
  }
}
