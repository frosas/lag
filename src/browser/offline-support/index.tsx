import React from "react";
import ReactDOM from "react-dom";
import ServiceWorker from "./service-worker";
import Component from "../../universal/offline-support/Component";

type ConstructorParams = {
  serviceWorkerUrl: string;
  domElement: Element;
};

export default class OfflineSupport {
  constructor({ serviceWorkerUrl, domElement }: ConstructorParams) {
    const serviceWorker = new ServiceWorker({ url: serviceWorkerUrl });
    ReactDOM.render(
      <Component serviceWorker={serviceWorker}></Component>,
      domElement
    );
  }
}
