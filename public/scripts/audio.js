define(['user', 'audiolet'], function(user) {
    return function(user, pings) {
        var audiolet = new Audiolet(null, 1)
        var gain = new Gain(audiolet, 1)
        gain.connect(audiolet.output)
        var filter = new LowPassFilter(audiolet, 1)
        filter.connect(gain)
        var whiteNoise = new WhiteNoise(audiolet)
        whiteNoise.connect(filter)

        user.on('hear', function() { 
            var currentFrequency = filter.frequency.getValue()
            var targetFrequency = pings.currentLag() / 4
            var targetFrequency = Math.min(targetFrequency, 800) // Frequency limit
            var nextFrequency = currentFrequency + (targetFrequency - currentFrequency) / 8
            filter.frequency.setValue(nextFrequency) 
        })

        return {
            setVolume: function(volume) {
                gain.gain.setValue(volume)
            },
            getVolume: function() {
                return gain.gain.getValue()
            }
        }
    }
})
