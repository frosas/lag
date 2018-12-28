import Pings from "./Pings";
import User from "./User";

const getBulletUrl = (color: string) => {
  return `images/bullet_${color}.png`;
};

const getColor = (lag: number) => {
  return (
    (lag < 50 && "green") ||
    (lag < 100 && "yellow") ||
    (lag < 500 && "orange") ||
    (lag < 5000 && "red") ||
    "black"
  );
};

const getIconUrl = (lag: number) => getBulletUrl(getColor(lag));

const getIconLinkElement = () => {
  let icon = document.querySelector("link[rel~=icon]") as HTMLLinkElement;
  if (!icon) {
    icon = document.createElement("link") as HTMLLinkElement;
    icon.rel = "icon";
    document.head.appendChild(icon);
  }
  icon.type = "image/png";
  return icon;
};

export default class {
  constructor(user: User, pings: Pings) {
    const iconElement = getIconLinkElement();
    user.events.on(
      "read",
      () => (iconElement.href = getIconUrl(pings.currentLag))
    );
  }
}
