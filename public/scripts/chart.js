define(['d3'], function() {
    return function(user, pings) {
        var element = d3.select('#chart').append('svg:svg')
        var elementHeight = parseInt(element.style('height'), 10)
        var barWidth = 8 // px

        var xScale = d3.scale.linear()

        var onResize = function() {
            var elementWidth = parseInt(element.style('width'), 10)
            pings.setMax(elementWidth / barWidth) // Yes, this a float
            xScale.range([0, elementWidth])
        }
        window.addEventListener('resize', onResize)
        onResize()

        var yScale = function(lag) { 
            // 0 -> 0, normalLag -> .1, ∞ -> 1
            var normalLag = 200
            var normalizedLag = Math.atan(lag / normalLag / 10) * 2 / Math.PI

            return normalizedLag * elementHeight 
        }

        var selections = (function() {
            var entered, updated, exited
            return {
                entered: function() { return entered },
                updated: function() { return updated },
                exited: function() { return exited },
                update: function() {
                    var data = pings.all().map(function(ping) {
                        return {ping: ping, exiting: false, ended: false}
                    })
                    updated = element.selectAll('rect')
                        .data(data, function(datum) { return datum.ping.start() })
                    entered = updated.enter()
                    exited = updated.exit()
                }
            }
        })()

        selections.update()

        user.on('view', function() {
            ;[selections.updated(), selections.exited()].forEach(function(selection) {
                selection.each(function(datum) {
                    if (datum.ended) return
                    if (datum.ping.end()) {
                        datum.ended = true
                        d3.select(this).style('fill-opacity', 1)
                    }
                    d3.select(this)
                        .attr('y', elementHeight - yScale(datum.ping.lag()))
                        .attr('height', yScale(datum.ping.lag()))
                })

                var now = Date.now()
                xScale.domain([now - pings.max() * pings.pingInterval(), now])
                selection.attr('x', function(datum) { return xScale(datum.ping.start()) })
            })
        })

        pings.on('add', function() {
            selections.update()

            selections.entered().append('svg:rect')
                .attr('width', barWidth)
                .attr('fill-opacity', .7)

            selections.exited().each(function(datum) {
                if (datum.exiting) return
                datum.exiting = true
                d3.select(this).transition().duration(pings.pingInterval() * 2).remove()
            })
        })
    }
})
