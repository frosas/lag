define(function() {

    var original = document.title

    return {
        update: function(ping) {
            // TODO Update only every second with the average lag
            document.title = original + " (" + ping.lag + " ms)"
        }
    }
})
