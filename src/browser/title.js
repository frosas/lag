import util from "./util";

export default ({ user, pings, domElement }) => {
  user.events.on("read", () => {
    domElement.textContent = util.humanizeLag(pings.currentLag);
  });
};
