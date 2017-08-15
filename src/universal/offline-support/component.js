const Inferno = require('inferno');
const InfernoComponent = require('inferno-component');
const h = require('inferno-create-element');

class Component extends InfernoComponent {
  render() {
    const {enabled, status} = this.props.offlineSupport;
    const content = `Offline support: ${enabled
      ? 'Enabled'
      : 'Disabled'} ${status ? ` (${status})` : ''}`;
    // RenderServer.renderToString() doesn't support render() returning a string
    // TODO Fix it?
    return h('span', null, content);
  }
}

module.exports = Component;

Component.render = (offlineSupport, domElement) => {
  // Avoid the Inferno warning "(...) or Initial render target is not empty"
  // TODO Is there simply a way to tell Inferno to not warn?
  domElement.innerHTML = '';
  render(offlineSupport, domElement);
  offlineSupport.events.on('change', () => {
    render(offlineSupport, domElement);
  });
};

const render = (offlineSupport, domElement) => {
  Inferno.render(h(Component, {offlineSupport}), domElement);
};
