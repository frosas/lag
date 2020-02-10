const React = require("react");
const { useForceUpdate } = require("../util");

const { useEffect } = React;

const e = React.createElement;

module.exports = ({ serviceWorker }) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    serviceWorker.events.on("change", forceUpdate);
  }, []);

  return [
    "Offline support:",
    e("img", {
      key: "image",
      className: "enabled",
      // TODO Use build ID in the URL
      src: `images/bullet_${serviceWorker.enabled ? "green" : "red"}.png`,
      alt: serviceWorker.enabled ? "Enabled" : "Disabled"
    }),
    serviceWorker.status && `(${serviceWorker.status})`
  ];
};
