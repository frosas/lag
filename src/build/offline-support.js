const InfernoServer = require('inferno-server');
const h = require('inferno-create-element');
const Component = require('../universal/offline-support/component');

exports.render = () => {
  return InfernoServer.renderToString(
    h(Component, {offlineSupport: {enabled: false, status: 'loading JS...'}})
  );
};
