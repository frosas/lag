define(function() {
    return function(audio) {
        if (! audio) {
            var configurationEl = document.getElementById('configuration')
            configurationEl.parentNode.removeChild(configurationEl)
            return
        }

        var volumeEl = document.getElementById('volume')

        var savedVolume = localStorage && localStorage.getItem('volume')
        if (savedVolume) audio.setVolume(savedVolume)

        volumeEl.value = audio.getVolume()
        volumeEl.addEventListener('change', function() {
            audio.setVolume(this.value)
            localStorage && localStorage.setItem('volume', this.value)
        })
    }
})
