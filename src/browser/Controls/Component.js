var React = require('react');

module.exports = class ControlsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {volume: props.initialVolume};
    }

    render() {
        return (
            <form id="controls">
                <label>
                    Volume {' '}
                    <input type="range" min="0" max="1" step="0.05"
                        value={this.state.volume}
                        onChange={this._onChange.bind(this)}
                    />
                </label>
            </form>
        );
    }

    _onChange(event) {
        var volume = event.target.value;
        this.setState({volume: volume});
        this.props.onChangeVolume(volume);
    }
};
