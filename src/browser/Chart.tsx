import * as React from "react";
import * as ReactDOM from "react-dom";
import ChartComponent from "./chart/Component";
import Pings from "./Pings";
import User from "./User";

export default class {
  constructor(user: User, pings: Pings, chartEl: HTMLElement) {
    user.events.on("view", () => {
      ReactDOM.render(
        <ChartComponent
          pings={pings}
          // We use the parent node dimensions as Firefox doesn't seem to work
          // with the svg element ones.
          width={chartEl.offsetWidth}
          height={chartEl.offsetHeight}
        />,
        chartEl
      );
    });
  }
}
