define(['underscore', 'backbone'], function() {
    return function() {
        var user = {}
        _.extend(user, Backbone.Events)
        setInterval(function() { user.trigger('read') }, 250) // At more speed the user won't be able to read
        d3.timer(function() { user.trigger('view') }) // At more speed the user won't notice any difference
        return user
    }
})
