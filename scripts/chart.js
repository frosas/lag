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

    var chart = (function() {

        var element = d3.select('#chart').append('svg:svg')
        var elementHeight = parseInt(element.style('height'))

        var maxPing = 5000 // TODO DRY

        var yScale = d3.scale.linear()
            .domain([0, maxPing])
            .range([0, elementHeight])

        var barWidth = 10 
        var setX = function(ping, i) { return i * barWidth }

        return {
            update: function() {

                var update = element.selectAll('rect')
                    .data(pings.all(), function(ping) { return ping.start })

                update.attr('x', setX)

                update.enter().append('svg:rect')
                    .attr('x', setX)
                    .attr('y', function(ping) { return yScale(maxPing - ping.lag) })
                    .attr('width', barWidth)
                    .attr('height', function(ping) { return yScale(ping.lag) })

                update.exit().remove()
            }
        }
    })()

    return {
        add: function(ping) {
            pings.add(ping)
            chart.update()
        }
    }
})
