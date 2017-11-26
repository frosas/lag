import React from "react";
import ReactDOM from "react-dom";
import ChartComponent from "./chart/Component";

export default class {
  constructor(user, pings, chartEl) {
    user.events.on("view", () => {
      ReactDOM.render(
        <ChartComponent pings={pings} chartEl={chartEl} />,
        chartEl
      );
    });
  }
}
