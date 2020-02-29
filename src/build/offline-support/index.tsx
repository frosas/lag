import React from "react";
import { renderToString } from "react-dom/server";
import Component from "../../universal/offline-support/Component";
import ServiceWorker from "../../browser/offline-support/service-worker";

export const render = () => {
  // TODO Combine this with src/browser/offline-support/ServiceWorker
  const serviceWorker = {
    statusCode: "INITIALIZING",
    statusMessage: "loading..."
  } as ServiceWorker; // TODO
  return renderToString(<Component serviceWorker={serviceWorker}></Component>);
};
