define(['human-interval'], function(humanInterval) {
    return function(user, pings) {
        var original = document.title
        user.on('read', function() { 
            document.title = original + " (" + humanInterval(pings.currentLag()) + ")" 
        })
    }
})
