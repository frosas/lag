import { scaleLinear } from "d3-scale";
import React from "react";

export default class extends React.Component {
  constructor(...args) {
    super(...args);
    this._barWidth = 8; // px
    this._xScale = scaleLinear();
  }

  render() {
    const now = Date.now();
    const pings = this.props.pings;
    pings.max = this.props.width / this._barWidth + 1;
    this._xScale.range([0, this.props.width]);
    this._xScale.domain([now - (pings.max - 1) * pings.interval, now]);
    return (
      <svg>
        {pings.all.map(ping => {
          return (
            <rect
              key={ping.start}
              fill={ping.failed ? "#ae3f24" : "#474739"}
              fillOpacity={ping.done ? 1 : 0.7}
              width={this._barWidth}
              height={this._yScale(ping.lag)}
              x={this._xScale(ping.start)}
              y={this.props.height - this._yScale(ping.lag)}
            />
          );
        })}
      </svg>
    );
  }

  _yScale(lag) {
    // 0 -> 0, normalLag -> .1, ∞ -> 1
    const normalLag = 50;
    const normalizedLag = Math.atan(lag / normalLag / 10) * 2 / Math.PI;
    return normalizedLag * this.props.height;
  }
}
