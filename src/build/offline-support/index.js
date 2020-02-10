const ReactDOMServer = require("react-dom/server");
const React = require("react");
const Component = require("../../universal/offline-support/Component");

const e = React.createElement;

exports.render = () => {
  // TODO Combine this with src/browser/ServiceWorker
  const serviceWorker = { enabled: false, status: "loading JS..." };
  return ReactDOMServer.renderToString(e(Component, { serviceWorker }));
};
