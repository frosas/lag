const ReactDOMServer = require("react-dom/server");
const React = require("react");
const Component = require("../universal/OfflineSupportComponent");

const e = React.createElement;

module.exports = () => {
  return ReactDOMServer.renderToString(
    e(Component, {
      offlineSupport: { enabled: false, status: "loading JS..." }
    })
  );
};
