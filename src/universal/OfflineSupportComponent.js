const React = require("react");
const ReactDOM = require("react-dom");
const { useForceUpdate } = require("./util");

const { useEffect } = React;

const e = React.createElement;

const Component = ({ offlineSupport }) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    offlineSupport.events.on("change", forceUpdate);
  }, []);

  return [
    "Offline support:",
    e("img", {
      key: "image",
      className: "enabled",
      // TODO Use build ID in the URL
      src: `images/bullet_${offlineSupport.enabled ? "green" : "red"}.png`,
      alt: offlineSupport.enabled ? "Enabled" : "Disabled"
    }),
    offlineSupport.status && `(${offlineSupport.status})`
  ];
};

module.exports = Component;

Component.render = (offlineSupport, domElement) => {
  ReactDOM.render(e(Component, { offlineSupport }), domElement);
};
