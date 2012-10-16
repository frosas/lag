define(['user', 'audiolet'], function(user) {
    return function(user, pings) {
        var audiolet = new Audiolet(null, 1)
        var sine = new WhiteNoise(audiolet)
        var filter = new LowPassFilter(audiolet, 1)
        sine.connect(filter)
        filter.connect(audiolet.output)

        user.on('hear', function() { 
            // TODO More easing (now one can hear frequency changing steps)
            // TODO More "windy" (add light random frequency variations trough every few seconds)
            var currentFrequency = filter.frequency.getValue()
            var targetFrequency = pings.currentLag() / 4
            var targetFrequency = Math.min(targetFrequency, 800) // Frequency limit
            var nextFrequency = currentFrequency + (targetFrequency - currentFrequency) / 8
            filter.frequency.setValue(nextFrequency) 
        })
    }
})
