/* eslint-env amd */

define(
    ['realtime-set-interval', 'underscore', 'backbone'], 
    function(realtimeSetInterval, _, Backbone) {
        // User won't notice lower intervals than these
        return function() {
            var user = _.extend({}, Backbone.Events);
            var maxReadInterval = 250;

            var triggerReadIfNeeded = (function() {
                var lastRead;
                return function() {
                    var now = Date.now();
                    if (!lastRead || now - lastRead >= maxReadInterval) {
                        user.trigger('read');
                        lastRead = now;
                    }
                };
            })();

            (function userViewTimer() {
                requestAnimationFrame(userViewTimer); // Consumes less CPU than d3.timer()
                user.trigger('view');
                triggerReadIfNeeded();
            })();

            // requestanimationframe() is not always triggered when the tab is not 
            // active. Here we ensure it is called at least once every second (as we 
            // are not using realtimeSetInterval())
            setInterval(triggerReadIfNeeded, maxReadInterval);

            realtimeSetInterval(function() { user.trigger('hear'); }, 250);

            return user;
        };
    }
);
