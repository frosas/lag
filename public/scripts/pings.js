define(['underscore', 'backbone', 'jquery'], function() {
    return function() {
        var pings = []
        var max = 100
        var lastRespondingPingLag = 0
        var pingInterval = 500

        var create = function() {
            var start = Date.now()
            var end

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
                }
            }

            $.ajax({
                // Resource shall be small, close to the user (eg, in a CDN) and in the web (not in localhost or the
                // intranet)
                url: 'http://lag.frosas.net/scripts/blank.js',
                timeout: 60000  ,
                dataType: 'script',
                success: function() { 
                    end = Date.now()
                    lastRespondingPingLag = ping.lag()
                },
                error: function(xhr, status, error) { console.error(error) }
            })

            return ping
        }

        var getFirstOfTheLastUnrespondedPings = function() {
            var first
            for (var i = pings.length - 1; i >= 0; i--) {
                if (pings[i].end()) break
                first = pings[i]
            }
            if (first) return first
        }

        var object = {
            all: function() {
                return pings
            },
            setMax: function(_max) {
                max = _max
            },
            max: function() {
                return max
            },
            currentLag: function() {
                var firstOfTheLastUnrespondedPings = getFirstOfTheLastUnrespondedPings()
                if (firstOfTheLastUnrespondedPings) {
                    return Math.max(lastRespondingPingLag, firstOfTheLastUnrespondedPings.lag())
                }

                return lastRespondingPingLag
            },
            pingInterval: function() {
                return pingInterval
            }
        }

        _.extend(object, Backbone.Events)

        setInterval(function() {
            var ping = create()
            pings.push(ping)
            pings = pings.slice(-max)
            object.trigger('add', ping)
        }, pingInterval)

        return object
    }
})
