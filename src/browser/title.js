import util from "./util";

export default (user, pings) => {
  const titleEl = document.querySelector("#title");
  user.events.on("read", () => {
    titleEl.textContent = util.humanizeLag(pings.currentLag);
  });
};
