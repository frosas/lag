define(['common'], function(common) {
    return function(user, pings) {
        var pingQualityIconUrl = function() {
            var lag = pings.currentLag()
            if (lag < 200) return 'images/bullet_green.png'   // Good
            if (lag < 300) return 'images/bullet_yellow.png'  // Almost good
            if (lag < 1000) return 'images/bullet_orange.png' // So so
            if (lag < 5000) return 'images/bullet_red.png'    // Bad
            return 'images/bullet_black.png'                         // Really bad
        }

        var $icon = $('link[rel~=icon]')
        if (! $icon.length) $icon = $('<link rel="icon">').appendTo('head')
        $icon.attr('type', 'image/png')

        user.on('read', function() {
            $icon.attr('href', pingQualityIconUrl())
        })
    }
})
