import React from "react"
import { createRoot } from "react-dom/client"
import OfflineSupportComponent from "../../universal/offline-support/components"
import ServiceWorkerLoader from "./service-worker/loader"

type ConstructorParams = {
  serviceWorkerUrl: string
  domElement: Element
}

export default class OfflineSupport {
  constructor({ serviceWorkerUrl, domElement }: ConstructorParams) {
    const serviceWorkerLoader = new ServiceWorkerLoader({
      url: serviceWorkerUrl,
    })
    createRoot(domElement).render(
      <OfflineSupportComponent
        serviceWorkerLoader={serviceWorkerLoader}
      ></OfflineSupportComponent>,
    )
  }
}
