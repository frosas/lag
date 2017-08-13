import lag from './lag';

export default (user, pings) => {
  const original = document.title;
  user.events.on('read', () => {
    document.title = `${lag.humanize(pings.currentLag)} - ${original}`;
  });
};
