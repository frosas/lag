import React from "react"
import { renderToString } from "react-dom/server"
import ServiceWorkerLoader from "../../browser/offline-support/service-worker/loader"
import OfflineSupport from "../../universal/offline-support/components"

export const render = () => {
  // TODO Combine this with src/browser/offline-support/ServiceWorker
  const serviceWorkerLoader = {
    statusCode: "INITIALIZING",
    statusMessage: "loading...",
  } as ServiceWorkerLoader // TODO
  return renderToString(
    <OfflineSupport serviceWorkerLoader={serviceWorkerLoader}></OfflineSupport>,
  )
}
