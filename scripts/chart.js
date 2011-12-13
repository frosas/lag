define(function() {

    var pings = (function() {
        var pings = []
        var max = 80
        return {
            add: function(ping) {
                pings.push(ping)
                pings = pings.slice(-max)
            },
            all: function() {
                return pings
            }
        }
    })()

    var element = d3.select('#chart').append('svg:svg')
    var elementHeight = parseInt(element.style('height'))

    var maxPing = 5000 // TODO DRY

    var y = d3.scale.linear()
        .domain([0, maxPing])
        .range([0, elementHeight])

    var barWidth = 10 
    var setX = function(ping, i) { return i * barWidth }

    var update = function() {

        var update = element.selectAll('rect')
            .data(pings.all(), function(ping) { return ping.start })

        update.enter().append('svg:rect')
            .attr('x', setX)
            .attr('y', function(ping) { return y(maxPing - ping.lag) })
            .attr('width', barWidth)
            .attr('height', function(ping) { return y(ping.lag)  })

        update.attr('x', setX)

        update.exit().remove()
    }

    return {
        add: function(ping) {
            pings.add(ping)
            update()
        }
    }
})
