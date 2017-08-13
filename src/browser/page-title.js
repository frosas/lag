import lag from './lag';

module.exports = (user, pings) => {
  const original = document.title;
  user.events.on('read', () => {
    document.title = `${lag.humanize(pings.currentLag)} - ${original}`;
  });
};
