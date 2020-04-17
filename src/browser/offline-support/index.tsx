import React from "react";
import ReactDOM from "react-dom";
import ServiceWorkerLoader from "./service-worker/loader";
import OfflineSupportComponent from "../../universal/offline-support/components";

type ConstructorParams = {
  serviceWorkerUrl: string;
  domElement: Element;
};

export default class OfflineSupport {
  constructor({ serviceWorkerUrl, domElement }: ConstructorParams) {
    const serviceWorkerLoader = new ServiceWorkerLoader({
      url: serviceWorkerUrl,
    });
    ReactDOM.render(
      <OfflineSupportComponent
        serviceWorkerLoader={serviceWorkerLoader}
      ></OfflineSupportComponent>,
      domElement
    );
  }
}
