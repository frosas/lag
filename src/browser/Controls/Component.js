import React from "react";

export default class ControlsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { volume: props.initialVolume };
  }

  render() {
    return (
      <form id="controls">
        Volume{" "}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={this.state.volume}
          onChange={event => this._onChange(event)}
        />
      </form>
    );
  }

  _onChange(event) {
    const volume = event.target.value;
    this.setState({ volume });
    this.props.onChangeVolume(volume);
  }
}
