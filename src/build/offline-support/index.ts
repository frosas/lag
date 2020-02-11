import React from "react";
import { renderToString } from "react-dom/server";
import Component from "../../universal/offline-support/Component";
import ServiceWorker from "../../browser/offline-support/ServiceWorker";

const e = React.createElement;

export const render = () => {
  // TODO Combine this with src/browser/offline-support/ServiceWorker
  const serviceWorker = {
    statusCode: "INITIALIZING",
    statusMessage: "loading..."
  } as ServiceWorker; // TODO
  return renderToString(e(Component, { serviceWorker }));
};
