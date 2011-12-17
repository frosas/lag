define(function() {

    var pingQualityIconUrl = function(ping) {
        if (ping.lag < 100) return 'images/bullet_green.png'
        if (ping.lag < 200) return 'images/bullet_yellow.png'
        if (ping.lag < 300) return 'images/bullet_orange.png'
        if (ping.lag < 5000 /* TODO DRY */) return 'images/bullet_red.png'
        return 'images/bullet_black.png'
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
