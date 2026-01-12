import "./error-tracking"
import "../../styles/main.css"
import type { AppData } from "../build/app-data"
import PageIcon from "./page-icon"
import PageTitle from "./page-title"
import Pings from "./pings"
import Title from "./title"
import User from "./user"
import { assertNotNullable } from "./util"

declare global {
  interface Window {
    __APP_DATA__: AppData
  }
}

const appData = window.__APP_DATA__

const pings = new Pings({
  workerUrl: appData.pingWorkerUrl,
})

const user = new User()

new PageTitle(user, pings)

new PageIcon(user, pings)

new Title({
  element: assertNotNullable(document.querySelector("#title")),
  pings,
  user,
})

void import("./chart").then(
  ({ default: Chart }) =>
    new Chart({
      element: assertNotNullable(document.querySelector("#chart")),
      pings,
      user,
    }),
)

void import(/* webpackChunkName: "offline-support" */ "./offline-support").then(
  ({ default: OfflineSupport }) =>
    new OfflineSupport({
      serviceWorkerUrl: appData.serviceWorkerUrl,
      domElement: assertNotNullable(document.querySelector("#offline-support")),
    }),
)

void import(/* webpackChunkName: "audio" */ "./audio").then(
  ({ default: Audio }) =>
    new Audio({
      user,
      pings,
      domElement: assertNotNullable(
        document.querySelector("#controls-placeholder"),
      ),
    }),
)
