import * as React from "react";
import * as ReactDOM from "react-dom";
import ServiceWorker from "./ServiceWorker";

const Component = require("../../universal/offline-support/Component");

const e = React.createElement;

type ConstructorParams = {
  serviceWorkerUrl: string;
  domElement: HTMLElement;
};

export default class {
  constructor({ serviceWorkerUrl, domElement }: ConstructorParams) {
    const serviceWorker = new ServiceWorker({ url: serviceWorkerUrl });
    ReactDOM.render(e(Component, { serviceWorker }), domElement);
  }
}
