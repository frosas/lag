define(['underscore', 'backbone'], function() {
    return function() {
        var start, end, request

        var ping = {
            lag: function() {
                return (end || Date.now()) - start
            },
            start: function() {
                return start
            },
            end: function() {
                return end
            }
        }

        _.extend(ping, Backbone.Events)

        $.ajax({
            // Resource shall be small, close to the user (eg, in a CDN) and in the web (not in localhost or the
            // intranet)
            url: 'http://lag.frosas.net/scripts/blank.js',
            timeout: 999999999, // "Forever"
            dataType: 'script',
            beforeSend: function() { start = Date.now() },
            success: function() { 
                end = Date.now()
                ping.trigger('pong')
            },
            error: function(xhr, status, error) { console.error(error) }
        })

        return ping
    }
})
