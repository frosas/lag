define(['chart-pings'], function(pings) {

    var element = d3.select('#chart').append('svg:svg')
    var elementWidth = parseInt(element.style('width'))
    var elementHeight = parseInt(element.style('height'))

    var maxPing = 5000 // TODO DRY

    var yScale = d3.scale.linear().domain([0, maxPing]).range([0, elementHeight])

    // TODO It is not displayed correctly if results in a float
    var barWidth = elementWidth / pings.max()

    var setChangingValues = function(selection) {
        selection
            .attr('x', function(ping, i) { return i * barWidth })
            .attr('y', function(ping) { return yScale(maxPing - ping.lag()) })
            .attr('height', function(ping) { return yScale(ping.lag()) })
            .style('fill-opacity', function(ping) { return ping.end() ? 1 : 0.7 })
    }

    setInterval(function() {

        var update = element.selectAll('rect')
            .data(pings.all(), function(ping, i) { return ping.start() })

        setChangingValues(update)

        var enter = update.enter().append('svg:rect')
        enter
            .attr('width', barWidth)
        setChangingValues(enter)

        update.exit().remove()

    }, 50)

    return {
        addPing: function() {
            return pings.add()
        }
    }
})
