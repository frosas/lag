module.exports = (audio) => {
    var volumeEl = document.getElementById('volume');
    
    var savedVolume = localStorage && localStorage.getItem('volume');
    if (savedVolume) audio.setVolume(savedVolume);

    volumeEl.value = audio.getVolume();
    volumeEl.addEventListener('change', function() {
        audio.setVolume(this.value);
        localStorage && localStorage.setItem('volume', this.value);
    });

    document.getElementById('controls').style.display = 'block';
};
