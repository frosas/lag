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
            return {
                pong: function() {
                    end = Date.now()
                },
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
                if (! lastRespondingPing) return '–'

                var firstOfTheLastUnrespondedPings = getFirstOfTheLastUnrespondedPings()
                if (firstOfTheLastUnrespondedPings) {
                    return Math.max(lastRespondingPing.lag(), firstOfTheLastUnrespondedPings.lag())
                }

                return lastRespondingPing.lag()
            }
        }

        _.extend(object, Backbone.Events)

        return object
    }
})
