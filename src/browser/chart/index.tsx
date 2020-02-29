import React from "react";
import ReactDOM from "react-dom";
import ChartComponent from "./components";
import Pings from "../pings";
import User from "../user";

interface ConstructorParams {
  user: User;
  pings: Pings;
  element: Element;
}

export default class Chart {
  constructor({ user, pings, element }: ConstructorParams) {
    user.events.on("view", () => {
      ReactDOM.render(
        <ChartComponent
          pings={pings}
          // We use the parent node dimensions as Firefox doesn't seem to work
          // with the svg element ones.
          width={element.scrollWidth}
          height={element.scrollHeight}
        />,
        element
      );
    });
  }
}
