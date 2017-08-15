import '../../styles/main.css';

import Chart from './chart';
import PageTitle from './page-title';
import PageIcon from './page-icon';
import Pings from './pings';
import Title from './title';
import User from './user';
import Audio_ from './audio';
import Controls from './controls';
import OfflineSupport from './offline-support';
import OfflineSupportComponent from '../universal/offline-support/component';

const user = new User();
const pings = new Pings();
const chartEl = document.querySelector('#chart');
new Chart(user, pings, chartEl);
new PageTitle(user, pings);
new PageIcon(user, pings);
new Title(user, pings);

try {
  new Controls(Audio_.create(user, pings));
} catch (error) {
  setTimeout(() => {
    throw error;
  });
}

OfflineSupportComponent.render(
  new OfflineSupport(),
  document.querySelector('#offline-support')
);
