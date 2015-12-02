const $ = require('jquery');

const getBulletUrl = (color, version) => `images/bullet_${color}.png?v=${version}`;

const pingQualityIconUrl = (lag, version) => {
    const color =
        lag < 100 && 'green' ||
        lag < 300 && 'yellow' ||
        lag < 1000 && 'orange' ||
        lag < 5000 && 'red' ||
        'black';
    return getBulletUrl(color, version);
};

module.exports = (user, pings, version) => {
    var $icon = $('link[rel~=icon]');
    if (! $icon.length) $icon = $('<link rel="icon">').appendTo('head');
    $icon.attr('type', 'image/png');
    user.on('read', () => {
        $icon.attr('href', pingQualityIconUrl(pings.currentLag(), version));
    });
};
