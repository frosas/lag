/* eslint-env amd */

define(['d3', 'jquery'], function(d3, $) {
    return function(user, pings) {
        var $chart = $('#chart');
        var d3Svg = d3.select($chart.get(0)).append('svg:svg');
        // [1] Use the parent node dimensions as Firefox doesn't seem to work with the svg element ones
        var d3SvgHeight = $chart.height();
        var barWidth = 8; // px

        var xScale = d3.scale.linear();

        var onResize = function() {
            var d3SvgWidth = $chart.width(); // See [1]
            pings.setMax(d3SvgWidth / barWidth); // Yes, this a float
            xScale.range([0, d3SvgWidth]);
        };
        window.addEventListener('resize', onResize);
        onResize();

        var yScale = function(lag) { 
            // 0 -> 0, normalLag -> .1, ∞ -> 1
            var normalLag = 200;
            var normalizedLag = Math.atan(lag / normalLag / 10) * 2 / Math.PI;
            return normalizedLag * d3SvgHeight;
        };

        var selections = (function() {
            var updated;
            return {
                entered: function() { return updated.enter(); },
                updated: function() { return updated; },
                exited: function() { return updated.exit(); },
                update: function() {
                    var data = pings.all().map(function(ping) {
                        return {ping: ping, exiting: false, ended: false};
                    });
                    updated = d3Svg.selectAll('rect').data(data, function(datum) { 
                        return datum.ping.start;
                    });
                }
            };
        })();

        selections.update();

        user.on('view', function() {
            [selections.updated(), selections.exited()].forEach(function(selection) {
                selection.each(function(datum) {
                    if (datum.ended) return;
                    if (datum.ping.end) {
                        datum.ended = true;
                        d3.select(this).attr('fill-opacity', 1);
                    }
                    d3.select(this)
                        .attr('y', Math.floor(d3SvgHeight - yScale(datum.ping.lag())))
                        .attr('height', Math.floor(yScale(datum.ping.lag())));
                });

                var now = Date.now();
                xScale.domain([now - pings.max() * pings.interval, now]);
                selection.attr('x', function(datum) { return xScale(datum.ping.start); });
            });
        });

        pings.on('add', function() {
            selections.update();

            selections.entered().append('svg:rect')
                .attr('width', barWidth)
                .attr('fill-opacity', .7);

            selections.exited().each(function(datum) {
                if (datum.exiting) return;
                datum.exiting = true;
                d3.select(this).transition().duration(pings.interval * 2).remove();
            });
        });
    };
});