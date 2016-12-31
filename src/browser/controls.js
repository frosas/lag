const React = require('react');
const ControlsComponent = require('./Controls/Component');

module.exports = class {
  constructor(audio) {
    this._audio = audio;

    const savedVolume = localStorage && localStorage.getItem('volume');
    if (savedVolume) audio.setVolume(savedVolume);

    React.render(
      <ControlsComponent
        initialVolume={audio.getVolume()}
        onChangeVolume={this._onChangeVolume.bind(this)}
      />,
      document.querySelector('#controls-placeholder'),
    );
  }

  _onChangeVolume(volume) {
    this._audio.setVolume(volume);
    if (localStorage) localStorage.setItem('volume', volume);
  }
};
