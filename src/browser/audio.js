/* eslint-disable no-console */

var Math_ = require('./math');

function Noise(context) {
    var lengthInSeconds = 5;
    var buffer = context.createBuffer(1, context.sampleRate * lengthInSeconds, context.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = data.length; i; i--) data[i] = Math.random() * 2 - 1;

    var source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.start(0);
    return source;
}

var Audio_ = module.exports = function(context, user, pings) {
    var gain = context.createGain();
    gain.connect(context.destination);

    var filter = context.createBiquadFilter();
    filter.frequency.value = 100;
    filter.Q.value = 0;
    filter.connect(gain);

    var noise = new Noise(context);
    noise.connect(filter);

    var maxFrequency = 800;
    var maxFrequencyIncrement = 30;
    user.on('hear', () => {
        var from = filter.frequency.value;
        var to = pings.currentLag();
        to = Math.min(to, maxFrequency);
        var increment = to - from;
        increment = Math.min(Math.abs(increment), maxFrequencyIncrement) * Math_.polarity(increment);
        filter.frequency.value += increment;
    });

    return {
        setVolume: volume => { gain.gain.value = volume; },
        getVolume: () => gain.gain.value,
    };
};

Audio_.create = (user, pings) => {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) throw new Error('Web Audio API not available');
    return new Audio_(new AudioContext, user, pings);
};
