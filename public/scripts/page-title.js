define(function() {
    return function() {
        var original = document.title

        return {
            update: function(ping) {
                document.title = original + " (" + ping.lag() + " ms)"
            }
        }
    }
})
