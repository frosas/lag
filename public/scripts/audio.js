define(['user', 'math'], function(user, _Math) {
    var Noise = function(context) {
        var lengthInSeconds = 5
        var buffer = context.createBuffer(1, context.sampleRate * lengthInSeconds, context.sampleRate)
        var data = buffer.getChannelData(0)
        for (var i = data.length; i; i--) data[i] = Math.random() * 2 - 1

        var source = context.createBufferSource()
        source.buffer = buffer
        source.loop = true
        source.noteOn(0)
        return source
    }

    var Audio = function(context, user, pings) {
        var gain = context.createGainNode()
        gain.connect(context.destination)

        var filter = context.createBiquadFilter()
        filter.frequency.value = 100;
        filter.Q.value = 0;
        filter.connect(gain)

        var noise = new Noise(context)
        noise.connect(filter)

        var maxIncrement = 25 // Hertz
        var currentPongId = 0 // To have a single logic executed at once
        pings.on('pong', function() {
            var pongId = ++currentPongId
            var to = pings.currentLag()
            to = Math.min(to, 800) // Max frequency
            ;(function doSteps() {
                var from = filter.frequency.value
                if (pongId !== currentPongId || _Math.equal(from, to)) return
                var increment = to - from
                increment = Math.min(Math.abs(increment), maxIncrement) * _Math.polarity(increment)
                filter.frequency.value += increment
                user.once('hear', doSteps)
            })()
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
