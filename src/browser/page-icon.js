const getBulletUrl = (color, version) => `images/bullet_${color}.png?v=${version}`;

const getIconUrl = (lag, version) => {
    const color =
        lag < 100 && 'green' ||
        lag < 300 && 'yellow' ||
        lag < 1000 && 'orange' ||
        lag < 5000 && 'red' ||
        'black';
    return getBulletUrl(color, version);
};

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

module.exports = (user, pings, version) => {
    const iconElement = getIconLinkElement();
    user.on('read', () => iconElement.href = getIconUrl(pings.currentLag(), version));
};
