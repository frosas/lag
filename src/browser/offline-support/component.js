import Inferno from 'inferno';
import InfernoComponent from 'inferno-component';
import OfflineSupportComponent from './component';

export default class OfflineSupport extends InfernoComponent {
  render() {
    const {enabled, status} = this.props.offlineSupport;
    return `${enabled ? 'Enabled' : 'Disabled'} ${status
      ? ` (${status})`
      : ''}`;
  }
}

OfflineSupport.render = (offlineSupport, domElement) => {
  // Avoid the Inferno warning "(...) or Initial render target is not empty"
  // TODO Is there simply a way to tell Inferno to not warn?
  domElement.innerHTML = '';
  render(offlineSupport, domElement);
  offlineSupport.events.on('change', () => {
    render(offlineSupport, domElement);
  });
};

const render = (offlineSupport, domElement) => {
  Inferno.render(
    <OfflineSupportComponent offlineSupport={offlineSupport} />,
    domElement
  );
};
