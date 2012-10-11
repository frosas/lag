define(['realtime-set-interval', 'underscore', 'backbone', 'd3'], function(realtimeSetInterval) {
    return function() {
        var user = {}
        _.extend(user, Backbone.Events)
        // User won't notice higher intervals than these
        setInterval(function() { user.trigger('read') }, 250)
        d3.timer(function() { user.trigger('view') })
        realtimeSetInterval(function() { user.trigger('hear') }, 100)
        return user
    }
})
