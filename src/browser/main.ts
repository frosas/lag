import "../../styles/main.css";

import DocumentIcon from "./DocumentIcon";
import DocumentTitle from "./DocumentTitle";
import Title from "./Title";
import { assertNotNullable } from "./util";
import Pings from "./Pings";
import User from "./User";

const pings = new Pings({
  // TODO That any
  pingWebWorkerUrl: assertNotNullable((window as any).app.pingWebWorkerUrl)
});
const user = new User();

const whenChart = import(
  /* webpackChunkName: "chart" */
  "./chart"
).then(({ default: Chart }) => Chart);

const whenControls = import(
  /* webpackChunkName: "controls" */
  "./audio/Controls"
).then(({ default: Controls }) => Controls);

const whenAudio = import(
  /* webpackChunkName: "audio" */
  "./audio/Audio"
).then(({ default: Audio }) => Audio);

const whenOfflineSupport = import(
  /* webpackChunkName: "offline-support" */
  "./offline-support/OfflineSupport"
).then(({ default: OfflineSupport }) => OfflineSupport);

new DocumentTitle(user, pings);

new DocumentIcon(user, pings);

new Title({
  element: assertNotNullable(document.querySelector("#title")),
  pings,
  user
});

whenChart.then(
  Chart =>
    new Chart({
      element: assertNotNullable(document.querySelector("#chart")),
      pings,
      user
    })
);

Promise.all([whenControls, whenAudio]).then(
  ([Controls, Audio]) =>
    new Controls({
      audio: new Audio(user, pings),
      domElement: assertNotNullable(
        document.querySelector("#controls-placeholder")
      )
    })
);

whenOfflineSupport.then(
  OfflineSupport =>
    new OfflineSupport({
      // TODO That any
      serviceWorkerUrl: assertNotNullable((window as any).app.serviceWorkerUrl),
      domElement: assertNotNullable(document.querySelector("#offline-support"))
    })
);
