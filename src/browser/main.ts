import "../../styles/main.css";

import DocumentIcon from "./DocumentIcon";
import DocumentTitle from "./DocumentTitle";
import Title from "./Title";
import { assertType } from "./util";

const whenUser = import(/* webpackChunkName: "user" */ "./User").then(
  ({ default: User }) => new User()
);

const whenPings = import(/* webpackChunkName: "pings" */ "./Pings").then(
  ({ default: Pings }) => new Pings()
);

Promise.all([whenUser, whenPings]).then(([user, pings]) => {
  new DocumentTitle(user, pings);
  new DocumentIcon(user, pings);
  new Title({
    element: assertType<Element>(document.querySelector("#title")),
    pings,
    user
  });
});

(async () => {
  const user = await whenUser;
  const pings = await whenPings;
  const { default: Chart } = await import(
    /* webpackChunkName: "chart" */
    "./Chart"
  );
  new Chart({
    element: assertType<HTMLElement>(document.querySelector("#chart")),
    pings,
    user
  });
})();

(async () => {
  const user = await whenUser;
  const pings = await whenPings;
  const { default: Controls } = await import(
    /* webpackChunkName: "controls" */
    "./controls"
  );
  const { default: Audio } = await import(
    /* webpackChunkName: "audio" */
    "./audio"
  );
  new Controls(new Audio(user, pings));
})();

(async () => {
  const OfflineSupportComponent = await import(
    /* webpackChunkName: "offline-support-component" */
    "../universal/OfflineSupportComponent"
  );
  const { default: OfflineSupport } = await import(
    /* webpackChunkName: "offline-support" */
    "./OfflineSupport"
  );
  OfflineSupportComponent.render(
    new OfflineSupport({
      serviceWorkerUrl: assertType<string>((window as any).app.serviceWorkerUrl)
    }),
    document.querySelector("#offline-support")
  );
})();
