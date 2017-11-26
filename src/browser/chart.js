import React from "react";
import ReactDOM from "react-dom";
import ChartComponent from "./chart/Component";

export default class {
  constructor(user, pings, chartEl) {
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
