define(['user'], function(user) {
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

    return function(user, pings) {
        var AudioContext = window.AudioContext || window.webkitAudioContext
        if (! AudioContext) {
            console.warn("Web Audio API not available")
            return
        }

        var context = new AudioContext

        var gain = context.createGainNode()
        gain.connect(context.destination)

        var filter = context.createBiquadFilter()
        filter.frequency.value = 100;
        filter.Q.value = 0;
        filter.connect(gain)

        var noise = new Noise(context)
        noise.connect(filter)

        user.on('hear', function() {
            var current = filter.frequency.value
            var target = pings.currentLag() / 2
            target = Math.min(target, 800) // Frequency limit
            var next = current + (target - current) / 8 // Reach target incrementally
            filter.frequency.value = next
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
})
