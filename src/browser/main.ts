import "./error-tracking"
import "../../styles/main.css"
import PageIcon from "./page-icon"
import PageTitle from "./page-title"
import Title from "./title"
import { assertNotNullable } from "./util"
import Pings from "./pings"
import User from "./user"

const pings = new Pings({
  // TODO Avoid that any
  workerUrl: (window as any).app.pingWorkerUrl,
})

const user = new User()

new PageTitle(user, pings)

new PageIcon(user, pings)

new Title({
  element: assertNotNullable(document.querySelector("#title")),
  pings,
  user,
})

import(/* webpackChunkName: "chart" */ "./chart").then(
  ({ default: Chart }) =>
    new Chart({
      element: assertNotNullable(document.querySelector("#chart")),
      pings,
      user,
    }),
)

import(/* webpackChunkName: "offline-support" */ "./offline-support").then(
  ({ default: OfflineSupport }) =>
    new OfflineSupport({
      // TODO Avoid that any
      serviceWorkerUrl: (window as any).app.serviceWorkerUrl,
      domElement: assertNotNullable(document.querySelector("#offline-support")),
    }),
)

import(/* webpackChunkName: "audio" */ "./audio").then(
  ({ default: Audio }) =>
    new Audio({
      user,
      pings,
      domElement: assertNotNullable(
        document.querySelector("#controls-placeholder"),
      ),
    }),
)
