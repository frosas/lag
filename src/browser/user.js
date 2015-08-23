var realtimeSetInterval = require('./realtime-set-interval');
var _ = require('underscore');
var Backbone = require('backbone');

// User won't notice lower intervals than these
var MAX_READ_INTERVAL = 250; // msecs

module.exports = () => {
    var user = _.extend({}, Backbone.Events);

    var triggerReadIfNeeded = (() => {
        var lastRead;
        return () => {
            var now = Date.now();
            if (!lastRead || now > lastRead + MAX_READ_INTERVAL) {
                user.trigger('read');
                lastRead = now;
            }
        };
    })();

    (function _userViewTimer() {
        requestAnimationFrame(_userViewTimer); // Consumes less CPU than d3.timer()
        user.trigger('view');
        triggerReadIfNeeded();
    })();

    // requestanimationframe() is not always triggered when the tab is not
    // active. Here we ensure it is called at least once every second (as we
    // are not using realtimeSetInterval())
    setInterval(triggerReadIfNeeded, MAX_READ_INTERVAL);

    realtimeSetInterval(() => { user.trigger('hear'); }, 250);

    return user;
};
