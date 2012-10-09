define(function() {
    return function(user, pings) {
        var original = document.title
        user.on('read', function() {
            document.title = original + " (" + pings.currentLag() + " ms)"
        })
    }
})
