const $ = require('jquery');

const getBulletUrl = color => `images/bullet_${color}.png`;

const pingQualityIconUrl = lag => {
    return getBulletUrl(
        lag < 100 && 'green' ||
        lag < 300 && 'yellow' ||
        lag < 1000 && 'orange' ||
        lag < 5000 && 'red' ||
        'black'
    );
};

module.exports = (user, pings) => {
    var $icon = $('link[rel~=icon]');
    if (! $icon.length) $icon = $('<link rel="icon">').appendTo('head');
    $icon.attr('type', 'image/png');
    user.on('read', () => { $icon.attr('href', pingQualityIconUrl(pings.currentLag())); });
};
