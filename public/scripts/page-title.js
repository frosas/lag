define(function() {
    return function() {
        var original = document.title

        return {
            update: function(lag) {
                document.title = original + " (" + lag + " ms)"
            }
        }
    }
})
