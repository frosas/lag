const React = require("react");
const ReactDOM = require("react-dom");

const e = React.createElement;

class Component extends React.Component {
  render() {
    const { enabled, status } = this.props.offlineSupport;
    return e("span", null, [
      "Offline support:",
      e("img", {
        key: "image",
        className: "enabled",
        // TODO Use build ID in the URL
        src: `images/bullet_${enabled ? "green" : "red"}.png`,
        alt: enabled ? "Enabled" : "Disabled"
      }),
      status && ` (${status})`
    ]);
  }
}

module.exports = Component;

Component.render = (offlineSupport, domElement) => {
  // Avoid the Inferno warning "(...) or Initial render target is not empty"
  // TODO Is there simply a way to tell Inferno to not warn?
  domElement.innerHTML = "";
  render(offlineSupport, domElement);
  offlineSupport.events.on("change", () => {
    render(offlineSupport, domElement);
  });
};

const render = (offlineSupport, domElement) => {
  ReactDOM.render(e(Component, { offlineSupport }), domElement);
};
