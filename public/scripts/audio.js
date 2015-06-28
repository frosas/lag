define(['./user', './math'], function(user, _Math) {
    var Noise = function(context) {
        var lengthInSeconds = 5
        var buffer = context.createBuffer(1, context.sampleRate * lengthInSeconds, context.sampleRate)
        var data = buffer.getChannelData(0)
        for (var i = data.length; i; i--) data[i] = Math.random() * 2 - 1

        var source = context.createBufferSource()
        source.buffer = buffer
        source.loop = true
        source.start(0)
        return source
    }

    var Audio = function(context, user, pings) {
        var gain = context.createGain()
        gain.connect(context.destination)

        var filter = context.createBiquadFilter()
        filter.frequency.value = 100;
        filter.Q.value = 0;
        filter.connect(gain)

        var noise = new Noise(context)
        noise.connect(filter)

        var maxFrequency = 800
        var maxFrequencyIncrement = 30
        user.on('hear', function() {
            var from = filter.frequency.value
            var to = pings.currentLag()
            to = Math.min(to, maxFrequency)
            var increment = to - from
            increment = Math.min(Math.abs(increment), maxFrequencyIncrement) * _Math.polarity(increment)
            filter.frequency.value += increment
        })

        return {
            setVolume: function(volume) {
                gain.gain.value = volume
            },
            getVolume: function() {
                return gain.gain.value
            }
        }
    }

    Audio.create = function(user, pings) {
        var AudioContext = window.AudioContext || window.webkitAudioContext

        if (! AudioContext) {
            console.warn("Web Audio API not available")
            return
        }

        return new Audio(new AudioContext, user, pings)
    }

    return Audio
})
