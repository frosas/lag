import React from "react";
import { FunctionComponent } from "react";
import ServiceWorker from "../../browser/offline-support/service-worker";
import { useForceUpdate } from "../util";

const { useEffect } = React;

// TODO How to type statusCode with ServiceWorker#statusCode type?
const getStatusCodeIcon = (statusCode: string) => {
  switch (statusCode) {
    case "INITIALIZING":
      return "🟡";
    case "WARNING":
      return "🟠";
    case "ERROR":
      return "🔴";
    case "READY":
      return "🟢";
    default:
      throw new Error("Unknown status code");
  }
};

type Props = {
  serviceWorker: ServiceWorker;
};

const Component: FunctionComponent<Props> = ({ serviceWorker }) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    serviceWorker.events.on("change", forceUpdate);
  }, []);

  return (
    <>
      {"Offline support: "}
      {getStatusCodeIcon(serviceWorker.statusCode)}
      {serviceWorker.statusMessage && ` (${serviceWorker.statusMessage})`}
    </>
  );
};

export default Component;
