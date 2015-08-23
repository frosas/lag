var $ = require('jquery');
var lag = require('./lag');

module.exports = (user, pings) => {
    var $title = $('#title');
    user.on('read', () => { $title.text(lag.humanize(pings.currentLag())); });
};
