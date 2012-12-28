define(function() {
    return function(user, pings) {
        var original = document.title
        user.on('readPageTitle', function() {
            document.title = original + " (" + pings.currentLag() + " ms)"
        })
    }
})
