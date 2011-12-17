define(function() {

    var pingQualityIconUrl = function(ping) {
        if (ping.lag < 100) return 'images/bullet_green.png'
        if (ping.lag < 200) return 'images/bullet_orange.png'
        return 'images/bullet_red.png'
    }

    var element = $('link[rel~=icon]')
    if (! element.length) element = $('<link rel="icon">').appendTo('head')
    element.attr('type', 'image/png')

    return {
        update: function(ping) {
            element.attr('href', pingQualityIconUrl(ping))
        }
    }
})
