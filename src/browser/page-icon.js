/* global BUILD_ID */

const getBulletUrl = color => `images/bullet_${color}.png?v=${BUILD_ID}`;

const getColor = lag =>
  lag < 50 && 'green' ||
  lag < 100 && 'yellow' ||
  lag < 500 && 'orange' ||
  lag < 1000 && 'red' ||
  'black';

const getIconUrl = lag => getBulletUrl(getColor(lag));

const getIconLinkElement = () => {
  let icon = document.querySelector('link[rel~=icon]');
  if (!icon) {
    icon = document.createElement('link');
    icon.rel = 'icon';
    document.head.appendChild(icon);
  }
  icon.type = 'image/png';
  return icon;
};

module.exports = (user, pings) => {
  const iconElement = getIconLinkElement();
  user.events.on('read', () => iconElement.href = getIconUrl(pings.currentLag));
};
