define(['underscore', 'backbone'], function() {
    return function() {
        var pings = []
        var max = 100

        var create = function() {
            var start = Date.now()
            var end

            var currentEnd = function() {
                return end || Date.now()
            }

            $.ajax({
                // Resource shall be small, close to the user (eg, in a CDN) and in the web (not in localhost or the
                // intranet)
                url: 'http://lag.frosas.net/scripts/blank.js',
                timeout: 60000  ,
                dataType: 'script',
                success: function() { end = Date.now() },
                error: function(xhr, status, error) { console.error(error) }
            })

            return {
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
        }

        var getLastRespondedPing = function() {
            for (var i = pings.length - 1; i >= 0; i--) {
                if (pings[i].end()) return pings[i]
            }
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
            add: function() {
                var ping = create()
                pings.push(ping)
                pings = pings.slice(-max)
                this.trigger('add', ping)
                return ping
            },
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
                var lastRespondingPing = getLastRespondedPing()
                var lastRespondingPingLag = lastRespondingPing ? lastRespondingPing.lag() : 0

                var firstOfTheLastUnrespondedPings = getFirstOfTheLastUnrespondedPings()
                if (firstOfTheLastUnrespondedPings) {
                    return Math.max(lastRespondingPingLag, firstOfTheLastUnrespondedPings.lag())
                }

                return lastRespondingPingLag
            }
        }

        _.extend(object, Backbone.Events)

        return object
    }
})
