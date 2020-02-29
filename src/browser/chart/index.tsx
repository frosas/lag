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
    ReactDOM.render(<ChartComponent user={user} pings={pings} />, element);
  }
}
