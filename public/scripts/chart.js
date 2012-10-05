define(['chart-pings', 'common'], function(pings, common) {
    var element = d3.select('#chart').append('svg:svg')
    var elementHeight = parseInt(element.style('height'), 10)

    var xScale = d3.scale.linear()

    var onResize = function() {
        var elementWidth = parseInt(element.style('width'), 10)
        pings.setMax(Math.ceil(elementWidth / common.barWidth))
        xScale.range([0, elementWidth])
    }
    window.addEventListener('resize', onResize)
    onResize()

    var yScale = function(ping) { 
        // 0 -> 0, normalPing -> .1, ∞ -> 1
        var normalPing = 200
        var normalizedPing = Math.atan(ping / normalPing / 10) * 2 / Math.PI

        return normalizedPing * elementHeight 
    }

    var selections = (function() {
        var entered, updated, exited
        return {
            entered: function() { return entered },
            updated: function() { return updated },
            exited: function() { return exited },
            update: function() {
                updated = element.selectAll('rect')
                    .data(pings.all(), function(ping) { return ping.start() })
                entered = updated.enter()
                exited = updated.exit()
            }
        }
    })()

    selections.update()

    setInterval(function() {
        ;[selections.updated(), selections.exited()].forEach(function(selection) {
            selection
                .attr('y', function(ping) { return elementHeight - yScale(ping.lag()) })
                .attr('height', function(ping) { return yScale(ping.lag()) })
                .style('fill-opacity', function(ping) { return ping.end() ? 1 : 0.7 })

            var now = new Date().getTime()
            xScale.domain([now - pings.max() * common.pingInterval, now])
            selection.attr('x', function(ping) { return xScale(ping.start()) })
        })
    }, 50)

    return {
        addPing: function() {
            var ping = pings.add()

            selections.update()

            selections.entered().append('svg:rect').attr('width', common.barWidth)

            selections.exited().transition()
                .duration(common.pingInterval)
                .remove()

            return ping
        }
    }
})
