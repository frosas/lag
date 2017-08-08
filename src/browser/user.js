const Events = require('events');

// User won't notice lower intervals than these
const MAX_READ_INTERVAL = 250; // msecs

module.exports = () => {
  const user = {events: new Events()};

  const triggerReadIfNeeded = (() => {
    let lastRead;
    return () => {
      const now = Date.now();
      if (!lastRead || now > lastRead + MAX_READ_INTERVAL) {
        user.events.emit('read');
        lastRead = now;
      }
    };
  })();

  (function _userViewTimer() {
    requestAnimationFrame(_userViewTimer);
    user.events.emit('view');
    triggerReadIfNeeded();
  })();

  // requestanimationframe() is not always triggered when the tab is not
  // active. Here we ensure it is called often enough
  setInterval(triggerReadIfNeeded, MAX_READ_INTERVAL);

  setInterval(() => user.events.emit('hear'), 250);

  return user;
};
