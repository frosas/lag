define(['ping', 'realtime-set-interval', 'underscore', 'backbone', 'jquery'], function(Ping, realtimeSetInterval) {
    return function() {
        var pings = []
        var max = 100
        var lastRespondedPing
        var pingInterval = 500

        var getFirstOfTheLastUnrespondedPings = function() {
            var first
            for (var i = pings.length - 1; i >= 0; i--) {
                if (pings[i].end()) break
                first = pings[i]
            }
            return first
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
                var lastRespondedPingLag = lastRespondedPing ? lastRespondedPing.lag() : 0

                var firstOfTheLastUnrespondedPingsLag = (function() {
                    var ping = getFirstOfTheLastUnrespondedPings()
                    return ping ? ping.lag() : 0
                })()

                return Math.max(lastRespondedPingLag, firstOfTheLastUnrespondedPingsLag)
            },
            pingInterval: function() {
                return pingInterval
            }
        }

        _.extend(object, Backbone.Events)

        realtimeSetInterval(function() {
            var ping = new Ping
            ping.on('pong', function() {
                if (! lastRespondedPing || lastRespondedPing.start() < ping.start()) {
                    lastRespondedPing = ping
                }
            })
            pings.push(ping)
            while (pings.length > max) pings.shift().destroy()
            object.trigger('add', ping)
        }, pingInterval)

        return object
    }
})
