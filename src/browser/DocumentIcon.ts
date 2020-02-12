import Pings from "./Pings";
import User from "./User";

enum BulletColors {
  GREEN = "green",
  YELLOW = "yellow",
  ORANGE = "orange",
  RED = "red",
  BLACK = "black"
}

const getBulletUrl = (color: string) => `images/bullet_${color}.png`;

const getColor = (lag: number) =>
  (lag < 50 && BulletColors.GREEN) ||
  (lag < 100 && BulletColors.YELLOW) ||
  (lag < 500 && BulletColors.ORANGE) ||
  (lag < 5000 && BulletColors.RED) ||
  BulletColors.BLACK;

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

// Preload images so that they're cached before going offline
Object.values(BulletColors).forEach(color => {
  // We don't use fetch() to ensure request priority is low
  // TODO Keep an eye on https://developers.google.com/web/updates/2019/02/priority-hints
  const el = document.createElement("img");
  el.src = getBulletUrl(color);
  document.head.appendChild(el);
});
