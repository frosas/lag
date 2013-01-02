define(['underscore', 'backbone'], function() {
    return function() {
        var start, end

        var ping = {
            lag: function() { return (end || Date.now()) - start },
            start: function() { return start },
            end: function() { return end }
        }

        _.extend(ping, Backbone.Events)

        var script = document.createElement('script')
        script.async = true
        script.addEventListener('load', function() {
            end = Date.now()
            script.parentNode.removeChild(script)
            ping.trigger('pong')
        })
        start = Date.now()
        script.src = 'http://lag.frosas.net/scripts/blank.js?' + start
        document.head.appendChild(script)

        return ping
    }
})
