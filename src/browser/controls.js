var React = require('react');
var ControlsComponent = require('./Controls/Component');

module.exports = class Controls {
    constructor(audio) {
        this._audio = audio;

        var savedVolume = localStorage && localStorage.getItem('volume');
        if (savedVolume) audio.setVolume(savedVolume);

        React.render(
            <ControlsComponent
                initialVolume={audio.getVolume()}
                onChangeVolume={this._onChangeVolume.bind(this)}
            />,
            document.querySelector('#controls-placeholder')
        );
    }

    _onChangeVolume(volume) {
        this._audio.setVolume(volume);
        localStorage && localStorage.setItem('volume', volume);
    }
};
