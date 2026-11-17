import React from "react"
import { FunctionComponent } from "react"
import ServiceWorkerLoader from "../../../browser/offline-support/service-worker/loader"

const { useCallback, useSyncExternalStore } = React

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
  serviceWorkerLoader: Pick<
    ServiceWorkerLoader,
    "events" | "statusCode" | "statusMessage"
  >
}

const OfflineSupport: FunctionComponent<Props> = ({ serviceWorkerLoader }) => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      serviceWorkerLoader.events.on("change", onChange)
      return () => {
        serviceWorkerLoader.events.off("change", onChange)
      }
    },
    [serviceWorkerLoader],
  )
  const getStatusCode = () => serviceWorkerLoader.statusCode
  const getStatusMessage = () => serviceWorkerLoader.statusMessage
  const statusCode = useSyncExternalStore(
    subscribe,
    getStatusCode,
    getStatusCode,
  )
  const statusMessage = useSyncExternalStore(
    subscribe,
    getStatusMessage,
    getStatusMessage,
  )

  return (
    <>
      {"Offline support: "}
      {getStatusCodeIcon(statusCode)}
      {statusMessage && ` (${statusMessage})`}
    </>
  )
}

export default OfflineSupport
