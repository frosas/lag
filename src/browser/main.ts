import "core-js/stable";
import "regenerator-runtime/runtime";

import "../../styles/main.css";

import DocumentIcon from "./DocumentIcon";
import DocumentTitle from "./DocumentTitle";
import Pings from "./Pings";
import Title from "./Title";
import User from "./User";
import { assertType } from "./util";

const user = new User();
const pings = new Pings();
new DocumentTitle(user, pings);
new DocumentIcon(user, pings);
new Title({
  element: assertType<Element>(document.querySelector("#title")),
  pings,
  user
});

(async () => {
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
    new OfflineSupport(),
    document.querySelector("#offline-support")
  );
})();
