const d3 = require('d3');
const React = require('react');
const ReactDOM = require('react-dom');

class ChartComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this._barWidth = 8; // px
    this._xScale = d3.scaleLinear();
  }

  render() {
    this.props.pings.max = this._width / this._barWidth; // Yes, this is a float
    this._xScale.range([0, this._width]);
    const pings = this.props.pings;
    const now = Date.now();
    this._xScale.domain([now - pings.max * pings.interval, now]);
    return (
      <svg>
        {pings.all.map(ping => {
          return (
            <rect
              key={ping.start}
              fill={ping.failed ? '#ae3f24' : '#474739'}
              fillOpacity={ping.done ? 1 : 0.7}
              width={this._barWidth}
              height={this._yScale(ping.lag)}
              x={this._xScale(ping.start)}
              y={this._height - this._yScale(ping.lag)}
            />
          );
        })}
      </svg>
    );
  }

  _yScale(lag) {
    // 0 -> 0, normalLag -> .1, ∞ -> 1
    const normalLag = 200;
    const normalizedLag = Math.atan(lag / normalLag / 10) * 2 / Math.PI;
    return normalizedLag * this._height;
  }

  get _width() {
    // [1] Use the parent node dimensions as Firefox doesn't seem to work with
    // the svg element ones
    return this.props.chartEl.offsetWidth;
  }

  get _height() {
    return this.props.chartEl.offsetHeight; // See [1]
  }
}

module.exports = class {
  constructor(user, pings, chartEl) {
    user.events.on('view', () => {
      ReactDOM.render(
        <ChartComponent pings={pings} chartEl={chartEl} />,
        chartEl
      );
    });
  }
};
