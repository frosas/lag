define(function() {

    var pings = (function() {
        var pings = []
        var max = 40
        return {
            add: function(ping) {
                pings.push(ping)
                pings = pings.slice(-max)
            },
            pings: function() {
                return pings
            }
        }
    })()

    var update = function() {
        var update = d3.select('#chart').selectAll('div')
            .data(pings.pings(), function(ping) { return ping.start })
        update.append('div')
            .text(function(ping) { return ping.lag })
        update.enter().append('div')
            .style('height', function(ping) { return ping.lag + 'px' })
            .append('div')
                .text(function(ping) { return ping.lag })
        update.exit().remove()
    }

    return {
        add: function(ping) {
            pings.add(ping)
            update()
        }
    }
})
