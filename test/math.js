var requirejs = require('requirejs')
require('chai').should()

describe('Math', function() {
    var Math

    before(function(done) {
        requirejs(['public/scripts/math.js'], function(_Math) {
            Math = _Math
            done()
        })
    })

    describe('equal()', function() {
        it('should be true with same integer', function() {
            Math.equal(1, 1).should.equal(true)
        })

        it('should be false with distinct integers', function() {
            Math.equal(1, 2).should.equal(false)
        })

        it('should be true with similar floats', function() {
            Math.equal(1.01, 1.02, 1).should.equal(true)
        })

        it('should be false with slightly distinct floats', function() {
            Math.equal(1, 1.1, 1).should.equal(false)
        })

        it('should truncate, not round', function() {
            Math.equal(1, 1.9).should.equal(true)
        })
    })

    describe('polarity()', function() {
        it('should be 1 with a positive number', function() {
            Math.polarity(5).should.equal(1)
        })

        it('should be -1 with a negative number', function() {
            Math.polarity(-5).should.equal(-1)
        })
    })
})
