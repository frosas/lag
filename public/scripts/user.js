define(['realtime-set-interval', 'underscore', 'backbone', 'd3'], function(realtimeSetInterval) {
    // From http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    var requestAnimationFrame = 
        window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.msRequestAnimationFrame || 
        function(callback) { setTimeout(callback, 1000 / 60) }

    return function() {
        var user = _.extend({}, Backbone.Events)

        // User won't notice lower intervals than these

        setInterval(function() { user.trigger('read') }, 250)

        // Consumes less CPU than d3.timer() (2.74% vs 7.63%)
        ;(function userViewTimer() {
            requestAnimationFrame(userViewTimer)
            user.trigger('view')
        })()

        realtimeSetInterval(function() { user.trigger('hear') }, 100)

        return user
    }
})
