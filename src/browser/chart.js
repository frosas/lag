var d3 = require('d3');
var $ = require('jquery');

module.exports = function(user, pings) {
    var $chart = $('#chart');
    var d3Svg = d3.select($chart.get(0)).append('svg:svg');
    // [1] Use the parent node dimensions as Firefox doesn't seem to work with the svg element ones
    var d3SvgHeight = $chart.height();
    var barWidth = 8; // px

    var xScale = d3.scale.linear();

    var onResize = () => {
        var d3SvgWidth = $chart.width(); // See [1]
        pings.setMax(d3SvgWidth / barWidth); // Yes, this a float
        xScale.range([0, d3SvgWidth]);
    };
    window.addEventListener('resize', onResize);
    onResize();

    var yScale = (lag) => {
        // 0 -> 0, normalLag -> .1, ∞ -> 1
        var normalLag = 200;
        var normalizedLag = Math.atan(lag / normalLag / 10) * 2 / Math.PI;
        return normalizedLag * d3SvgHeight;
    };

    var onPingDone = (element, datum) => {
        element.attr('fill-opacity', 1);
        if (datum.ping.failed) element.attr('fill', '#ae3f24');
    };

    var selections = (() => {
        var updated;
        return {
            entered: () => updated.enter(),
            updated: () => updated,
            exited: () => updated.exit(),
            update: () => {
                var data = pings.all().map(ping => ({ping, exiting: false, done: false}));
                updated = d3Svg.selectAll('rect').data(data, datum => datum.ping.start);
            },
        };
    })();

    selections.update();

    user.on('view', () => {
        [selections.updated(), selections.exited()].forEach(selection => {
            selection.each(function(datum) {
                var element = d3.select(this);
                element
                    .attr('y', Math.floor(d3SvgHeight - yScale(datum.ping.lag())))
                    .attr('height', Math.floor(yScale(datum.ping.lag())));
                if (!datum.done && datum.ping.done) {
                    datum.done = true;
                    onPingDone(element, datum);
                }
            });

            var now = Date.now();
            xScale.domain([now - pings.max() * pings.interval, now]);
            selection.attr('x', datum => xScale(datum.ping.start));
        });
    });

    pings.on('add', () => {
        selections.update();

        selections.entered().append('svg:rect')
            .attr('width', barWidth)
            .attr('fill-opacity', 0.7)
            .attr('fill', '#474739');

        selections.exited().each(function(datum) {
            if (datum.exiting) return;
            datum.exiting = true;
            d3.select(this).transition().duration(pings.interval * 2).remove();
        });
    });
};
