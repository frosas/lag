import "../../styles/main.css";

import DocumentIcon from "./DocumentIcon";
import DocumentTitle from "./DocumentTitle";
import Title from "./Title";
import { assertType } from "./util";
import Pings from "./Pings";
import User from "./User";

const pings = new Pings();
const user = new User();

const whenChart = import(
  /* webpackChunkName: "chart" */
  "./Chart"
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
  element: assertType<Element>(document.querySelector("#title")),
  pings,
  user
});

whenChart.then(
  Chart =>
    new Chart({
      element: assertType<HTMLElement>(document.querySelector("#chart")),
      pings,
      user
    })
);

Promise.all([whenControls, whenAudio]).then(
  ([Controls, Audio]) =>
    new Controls({
      audio: new Audio(user, pings),
      domElement: assertType<Element>(
        document.querySelector("#controls-placeholder")
      )
    })
);

whenOfflineSupport.then(
  OfflineSupport =>
    new OfflineSupport({
      serviceWorkerUrl: assertType<string>(
        (window as any).app.serviceWorkerUrl
      ),
      domElement: assertType<HTMLElement>(
        document.querySelector("#offline-support")
      )
    })
);
