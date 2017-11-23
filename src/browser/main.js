import "babel-polyfill";

import "../../styles/main.css";

import Chart from "./chart";
import DocumentTitle from "./DocumentTitle";
import PageIcon from "./page-icon";
import Pings from "./pings";
import Title from "./title";
import User from "./user";
import Audio from "./audio";
import Controls from "./controls";
import OfflineSupport from "./OfflineSupport";
import OfflineSupportComponent from "../universal/OfflineSupportComponent";
import util from "../universal/util";

const user = new User();
const pings = new Pings();
const chartEl = document.querySelector("#chart");
new Chart(user, pings, chartEl);
new DocumentTitle(user, pings);
new PageIcon(user, pings);
new Title({ user, pings, domElement: document.querySelector("#title") });

util.resumeOnThrow(() => new Controls(new Audio(user, pings)));

OfflineSupportComponent.render(
  new OfflineSupport(),
  document.querySelector("#offline-support")
);
