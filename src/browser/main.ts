import "../../styles/main.css";

import DocumentIcon from "./DocumentIcon";
import DocumentTitle from "./DocumentTitle";
import Title from "./Title";
import { assertType } from "./util";

const whenPings = import(
  /* webpackChunkName: "pings" */
  "./Pings"
).then(({ default: Pings }) => new Pings());

const whenUser = import(
  /* webpackChunkName: "user" */
  "./User"
).then(({ default: User }) => new User());

const whenChart = import(
  /* webpackChunkName: "chart" */
  "./Chart"
).then(({ default: Chart }) => Chart);

const whenControls = import(
  /* webpackChunkName: "controls" */
  "./controls"
).then(({ default: Controls }) => Controls);

const whenAudio = import(
  /* webpackChunkName: "audio" */
  "./audio"
).then(({ default: Audio }) => Audio);

const whenOfflineSupportComponent = import(
  /* webpackChunkName: "offline-support-component" */
  "../universal/OfflineSupportComponent"
);

const whenOfflineSupport = import(
  /* webpackChunkName: "offline-support" */
  "./OfflineSupport"
).then(({ default: OfflineSupport }) => OfflineSupport);

Promise.all([whenUser, whenPings]).then(([user, pings]) => {
  new DocumentTitle(user, pings);
  new DocumentIcon(user, pings);
  new Title({
    element: assertType<Element>(document.querySelector("#title")),
    pings,
    user
  });
});

Promise.all([whenUser, whenPings, whenChart]).then(
  ([user, pings, Chart]) =>
    new Chart({
      element: assertType<HTMLElement>(document.querySelector("#chart")),
      pings,
      user
    })
);

// Re that "as const", see https://github.com/microsoft/TypeScript/issues/34937
Promise.all([whenUser, whenPings, whenControls, whenAudio] as const).then(
  ([user, pings, Controls, Audio]) => new Controls(new Audio(user, pings))
);

Promise.all([whenOfflineSupportComponent, whenOfflineSupport]).then(
  ([OfflineSupportComponent, OfflineSupport]) =>
    OfflineSupportComponent.render(
      new OfflineSupport({
        serviceWorkerUrl: assertType<string>(
          (window as any).app.serviceWorkerUrl
        )
      }),
      document.querySelector("#offline-support")
    )
);
