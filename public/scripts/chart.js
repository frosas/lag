define(['chart-pings'], function(pings) {

    var element = d3.select('#chart').append('svg:svg')
    var elementWidth = parseInt(element.style('width'))
    var elementHeight = parseInt(element.style('height'))

    var maxPing = 5000 // TODO DRY
    var pingInterval = 500 // TODO DRY

    var yScale = d3.scale.linear().domain([0, maxPing]).range([0, elementHeight])
    var xScale = d3.scale.linear().range([0, elementWidth])

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

    setInterval(function() {

        selections.updated()
            .attr('y', function(ping) { return yScale(maxPing - ping.lag()) })
            .attr('height', function(ping) { return yScale(ping.lag()) })
            .style('fill-opacity', function(ping) { return ping.end() ? 1 : 0.7 })

        var now = new Date().getTime()
        xScale.domain([now - pings.max() * pingInterval, now])
        ;[selections.updated(), selections.exited()].forEach(function(selection) {
            selection.attr('x', function(ping) { return xScale(ping.start()) })
        })

    }, 60)

    return {
        addPing: function() {

            var ping = pings.add()

            selections.update()

            selections.entered().append('svg:rect')
                .attr('width', barWidth)

            selections.exited().transition()
                .duration(pingInterval) // TODO DRY
                .remove()

            return ping
        }
    }
})
