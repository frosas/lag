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
        var user = _.extend({}, Backbone.Events)
        var lastRead
        var readInterval = 500

        // Consumes less CPU than d3.timer()
        ;(function userViewTimer() {
            requestAnimationFrame(userViewTimer)

            user.trigger('view')

            var now = Date.now()
            if (! lastRead || now - lastRead >= readInterval) {
                user.trigger('read')
                lastRead = now
            }
        })()

        // 'read' event is not triggered when the page is not active
        realtimeSetInterval(function() { user.trigger('readPageTitle') }, readInterval)

        realtimeSetInterval(function() { user.trigger('hear') }, 100)

        return user
    }
})
