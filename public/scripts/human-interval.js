'use strict'

// TODO Interval polarity

define(function() {

    /**
     * @param {float} interval In milliseconds
     * @return {string} The interval in a human-friendly format. E.g. 1234 -> "1 s 234 ms"
     */
    return function(interval) {
        var unit = 'ms'

        if (interval >= 60 * 1000) {
            interval = Math.floor(interval / 60 / 1000)
            unit = 'm'
        } else if (interval >= 5000) {
            interval = Math.floor(interval / 1000)
            unit = 's'
        }

        return interval + ' ' + unit
    }
})
