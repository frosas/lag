import "@babel/polyfill";

import "../../styles/main.css";

import * as OfflineSupportComponent from "../universal/OfflineSupportComponent";
import { resumeOnThrow } from "../universal/util";
import Audio from "./audio";
import Chart from "./Chart";
import Controls from "./controls";
import DocumentIcon from "./DocumentIcon";
import DocumentTitle from "./DocumentTitle";
import OfflineSupport from "./OfflineSupport";
import Pings from "./Pings";
import Title from "./Title";
import User from "./User";
import { assertType } from "./util";

const user = new User();
const pings = new Pings();
new Chart({
  element: assertType<HTMLElement>(document.querySelector("#chart")),
  pings,
  user
});
new DocumentTitle(user, pings);
new DocumentIcon(user, pings);
new Title({
  element: assertType<Element>(document.querySelector("#title")),
  pings,
  user
});

resumeOnThrow(() => new Controls(new Audio(user, pings)));

OfflineSupportComponent.render(
  new OfflineSupport(),
  document.querySelector("#offline-support")
);
