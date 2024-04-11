import React from "react"
import { FunctionComponent } from "react"
import ServiceWorkerLoader from "../../../browser/offline-support/service-worker/loader"
import { useForceUpdate } from "../../util"

const { useEffect } = React

// TODO How to type statusCode with ServiceWorker#statusCode type?
const getStatusCodeIcon = (statusCode: string) => {
  switch (statusCode) {
    case "INITIALIZING":
      return "🟡"
    case "WARNING":
      return "🟠"
    case "ERROR":
      return "🔴"
    case "READY":
      return "🟢"
    default:
      throw new Error("Unknown status code")
  }
}

type Props = {
  serviceWorkerLoader: ServiceWorkerLoader
}

const OfflineSupport: FunctionComponent<Props> = ({ serviceWorkerLoader }) => {
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    serviceWorkerLoader.events.on("change", forceUpdate)
  }, [])

  return (
    <>
      {"Offline support: "}
      {getStatusCodeIcon(serviceWorkerLoader.statusCode)}
      {serviceWorkerLoader.statusMessage &&
        ` (${serviceWorkerLoader.statusMessage})`}
    </>
  )
}

export default OfflineSupport
