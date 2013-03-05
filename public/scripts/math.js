define(function() {
    return {
        equal: function(a, b, decimals) {
            if (typeof decimals == 'undefined') decimals = 0
            a *= Math.pow(a, decimals)
            b *= Math.pow(b, decimals)
            return ! (parseInt(a, 10) - parseInt(b, 10))
        },

        polarity: function(number) {
            return number >= 0 ? 1 : -1
        }
    }
})
