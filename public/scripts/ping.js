define(['underscore', 'backbone'], function() {
    return function() {
        var start = Date.now()
        var end
        var request

        var currentEnd = function() {
            return end || Date.now()
        }

        var ping = {
            lag: function() {
                return currentEnd() - start
            },
            start: function() {
                return start
            },
            end: function() {
                return end
            },
            destroy: function() {
                request.abort()
            }
        }

        _.extend(ping, Backbone.Events)

        request = $.ajax({
            // Resource shall be small, close to the user (eg, in a CDN) and in the web (not in localhost or the
            // intranet)
            url: 'http://lag.frosas.net/scripts/blank.js',
            timeout: 999999999, // "Forever"
            dataType: 'script',
            success: function() { 
                end = Date.now()
                ping.trigger('pong')
            },
            error: function(xhr, status, error) { console.error(error) }
        })

        return ping
    }
})
