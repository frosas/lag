define(['chart-pings', 'config'], function(pings, config) {

    var element = d3.select('#chart').append('svg:svg')
    var elementWidth = parseInt(element.style('width'))
    var elementHeight = parseInt(element.style('height'))

    var xScale = d3.scale.linear().range([0, elementWidth])
    var yScale = d3.scale.linear().domain([0, config.maxPing]).range([0, elementHeight])

    // TODO It is not displayed correctly if results in a float
    var barWidth = elementWidth / pings.max()

    var selections = (function() {
        var entered, updated, exited
        return {
            entered: function() { return entered },
            updated: function() { return updated },
            exited: function() { return exited },
            update: function() {
                updated = element.selectAll('rect')
                    .data(pings.all(), function(ping, i) { return ping.start() })
                entered = updated.enter()
                exited = updated.exit()
            }
        }
    })()

    selections.update()

    d3.timer(function() {
        ;[selections.updated(), selections.exited()].forEach(function(selection) {
            selection
                .attr('y', function(ping) { return yScale(config.maxPing - ping.lag()) })
                .attr('height', function(ping) { return yScale(ping.lag()) })
                .style('fill-opacity', function(ping) { return ping.end() ? 1 : 0.7 })

            var now = new Date().getTime()
            xScale.domain([now - pings.max() * config.pingInterval, now])
            selection.attr('x', function(ping) { return xScale(ping.start()) })
        })
    })

    return {
        addPing: function() {

            var ping = pings.add()

            selections.update()

            selections.entered().append('svg:rect')
                .attr('width', barWidth)

            selections.exited().transition()
                .duration(config.pingInterval)
                .remove()

            return ping
        }
    }
})
