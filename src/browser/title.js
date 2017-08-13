import lag from './lag';

export default (user, pings) => {
  const titleEl = document.querySelector('#title');
  user.events.on('read', () => {
    titleEl.textContent = lag.humanize(pings.currentLag);
  });
};
