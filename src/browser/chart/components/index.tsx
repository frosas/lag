import { scaleLinear } from "d3-scale";
import React from "react";
import Pings, { INTERVAL as PINGS_INTERVAL } from "../../pings";
import User from "../../user";

interface Props {
  user: User;
  pings: Pings;
}

export default class Chart extends React.Component<Props> {
  private readonly _barWidth = 100 / this.props.pings.max; // %
  private readonly _xScale = scaleLinear().range([0, 100]);

  componentDidMount() {
    // TODO Stop listening on unmount
    this.props.user.events.on("view", () => this.forceUpdate());
  }

  render() {
    const now = Date.now();
    const { pings } = this.props;
    this._xScale.domain([now - (pings.max - 1) * PINGS_INTERVAL, now]);
    return (
      <svg>
        {this.props.pings.all.map(ping => (
          <rect
            key={ping.id}
            fill={ping.failed ? "#ae3f24" : "#474739"}
            fillOpacity={ping.done ? 1 : 0.7}
            width={`${this._barWidth}%`}
            height={`${this._yScale(ping.lag)}%`}
            x={`${this._xScale(ping.start)}%`}
            y={`${100 - this._yScale(ping.lag)}%`}
          />
        ))}
      </svg>
    );
  }

  _yScale(lag: number) {
    // 0 -> 0, normalLag -> .1, ∞ -> 1
    const normalLag = 50;
    const normalizedLag = (Math.atan(lag / normalLag / 10) * 2) / Math.PI;
    return normalizedLag * 100;
  }
}
