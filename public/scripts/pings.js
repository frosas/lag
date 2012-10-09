define(function() {
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

        return {
            add: function() {
                var ping = create()
                pings.push(ping)
                pings = pings.slice(-max)
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
            }
        }
    }
})
