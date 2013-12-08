define(['human-interval', 'jquery'], function(humanInterval) {
    return function(user, pings) {
        var $title = $('#title')
        user.on('read', function() {
            $title.text(humanInterval(pings.currentLag()))
        })
    }
})
