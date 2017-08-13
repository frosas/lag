import React from 'react';
import PropTypes from 'prop-types';

const ControlsComponent = (module.exports = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {volume: props.initialVolume};
  }

  render() {
    return (
      <form id="controls">
        Volume {' '}
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={this.state.volume}
          onChange={event => this._onChange(event)}
        />
      </form>
    );
  }

  _onChange(event) {
    const volume = event.target.value;
    this.setState({volume});
    this.props.onChangeVolume(volume);
  }
});

ControlsComponent.propTypes = {
  initialVolume: PropTypes.number,
  onChangeVolume: PropTypes.func,
};
