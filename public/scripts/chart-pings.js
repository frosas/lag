define(function() {

    var pings = []
    var max = 100

    var create = function() {
        var start = new Date().getTime()
        var end
        var currentEnd = function() {
            return end || new Date().getTime()
        }
        return {
            pong: function() {
                end = new Date().getTime()
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
            // console.log(pings.map(function(ping) { return ping.lag() }))
            return ping
        },
        all: function() {
            return pings
        },
        max: function() {
            return max
        }
    }
})
