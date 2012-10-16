define(function() {
    return function(audio) {
        var volumeEl = document.getElementById('volume')
        volumeEl.value = localStorage && localStorage.getItem('volume') || audio.getVolume()
        volumeEl.addEventListener('change', function() {
            audio.setVolume(this.value)
            localStorage && localStorage.setItem('volume', this.value)
        })
    }
})
