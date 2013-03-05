define(['realtime-set-interval', 'underscore', 'backbone', 'd3'], function(realtimeSetInterval) {
    // From http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    var requestAnimationFrame = 
        window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.msRequestAnimationFrame || 
        function(callback) { setTimeout(callback, 1000 / 60) }

    // User won't notice lower intervals than these
    return function() {
        var user = {hearingInterval: 250 /* ms */}

        user = _.extend(user, Backbone.Events)

        var lastRead
        var readInterval = 500

        // Consumes less CPU than d3.timer()
        ;(function userViewTimer() {
            requestAnimationFrame(userViewTimer)

            user.trigger('view')

            var now = Date.now()
            if (! lastRead || now - lastRead >= readInterval) {
                // Note that it will be triggered just once a second when the tab is 
                // not active
                user.trigger('read')

                lastRead = now
            }
        })()

        realtimeSetInterval(function() { user.trigger('hear') }, user.hearingInterval)

        return user
    }
})
