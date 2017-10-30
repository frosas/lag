const ReactDOMServer = require("react-dom/server");
const React = require("react");
const Component = require("../universal/offline-support/component");

const e = React.createElement;

exports.render = () => {
  return ReactDOMServer.renderToString(
    e(Component, {
      offlineSupport: { enabled: false, status: "loading JS..." }
    })
  );
};
