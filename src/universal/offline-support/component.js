const Inferno = require('inferno');
const InfernoComponent = require('inferno-component');
const h = require('inferno-create-element');

class Component extends InfernoComponent {
  render() {
    const {enabled, status} = this.props.offlineSupport;
    return h('span', null, [
      'Offline support:',
      h('img', {
        class: 'enabled',
        // TODO Use build ID in the URL
        src: `images/bullet_${enabled ? 'green' : 'red'}.png`,
        alt: enabled ? 'Enabled' : 'Disabled',
      }),
      status && ` (${status})`,
    ]);
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
