define(['audiolet'], function() {
    return function(pings) {
        var audiolet = new Audiolet
        var sine = new WhiteNoise(audiolet)
        var filter = new LowPassFilter(audiolet, 200)
        sine.connect(filter)
        filter.connect(audiolet.output)
        setInterval(function() { 
            // TODO More easing (now one can hear frequency changing steps)
            // TODO More "windy" (add light random frequency variations trough every few seconds)
            var currentFrequency = filter.frequency.getValue()
            var targetFrequency = 50 + pings.currentLag() / 4
            var nextFrequency = currentFrequency + (targetFrequency - currentFrequency) / 8
            filter.frequency.setValue(nextFrequency) 
        }, 100)
    }
})
