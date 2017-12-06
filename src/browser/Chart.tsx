import * as React from "react";
import * as ReactDOM from "react-dom";
import ChartComponent from "./chart/Component";
import Pings from "./Pings";
import User from "./User";

interface IConstructorParams {
  user: User;
  pings: Pings;
  element: HTMLElement;
}

export default class {
  constructor({ user, pings, element }: IConstructorParams) {
    user.events.on("view", () => {
      ReactDOM.render(
        <ChartComponent
          pings={pings}
          // We use the parent node dimensions as Firefox doesn't seem to work
          // with the svg element ones.
          width={element.offsetWidth}
          height={element.offsetHeight}
        />,
        element
      );
    });
  }
}
