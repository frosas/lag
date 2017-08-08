const d3 = require('d3');

module.exports = class {
  constructor(user, pings) {
    const chartEl = document.querySelector('#chart');
    const d3Svg = d3.select(chartEl).append('svg:svg');
    // [1] Use the parent node dimensions as Firefox doesn't seem to work with
    // the svg element ones
    const d3SvgHeight = chartEl.offsetHeight;
    const barWidth = 8; // px

    const xScale = d3.scaleLinear();

    const onResize = () => {
      const d3SvgWidth = chartEl.offsetWidth; // See [1]
      pings.max = d3SvgWidth / barWidth; // Yes, this is a float
      xScale.range([0, d3SvgWidth]);
    };
    addEventListener('resize', onResize);
    onResize();

    const yScale = lag => {
      // 0 -> 0, normalLag -> .1, ∞ -> 1
      const normalLag = 200;
      const normalizedLag = (Math.atan(lag / normalLag / 10) * 2) / Math.PI;
      return normalizedLag * d3SvgHeight;
    };

    const onPingDone = (element, datum) => {
      element.attr('fill-opacity', 1);
      if (datum.ping.failed) element.attr('fill', '#ae3f24');
    };

    const selections = (() => {
      let updated;
      return {
        entered: () => updated.enter(),
        updated: () => updated,
        exited: () => updated.exit(),
        update: () => {
          const data = pings.all.map(ping => ({ping, exiting: false, done: false}));
          updated = d3Svg.selectAll('rect').data(data, datum => datum.ping.start);
        },
      };
    })();

    selections.update();

    user.events.on('view', () => {
      [selections.updated(), selections.exited()].forEach(selection => {
        selection.each(function(datum) { // eslint-disable-line func-names
          const element =
            d3.select(this)
              .attr('y', Math.floor(d3SvgHeight - yScale(datum.ping.lag)))
              .attr('height', Math.floor(yScale(datum.ping.lag)));
          if (!datum.done && datum.ping.done) {
            datum.done = true; // eslint-disable-line no-param-reassign
            onPingDone(element, datum);
          }
        });

        const now = Date.now();
        xScale.domain([now - pings.max * pings.interval, now]);
        selection.attr('x', datum => xScale(datum.ping.start));
      });
    });

    pings.events.on('add', () => {
      selections.update();

      selections.entered().append('svg:rect')
        .attr('width', barWidth)
        .attr('fill-opacity', 0.7)
        .attr('fill', '#474739');

      selections.exited().each(function(datum) {
        if (datum.exiting) return;
        datum.exiting = true; // eslint-disable-line no-param-reassign
        d3.select(this).transition().duration(pings.interval * 2).remove();
      });
    });
  }
};
