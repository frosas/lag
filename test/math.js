define(['public/scripts/math'], function(_Math) {
    describe('Math', function() {
        describe('equal()', function() {
            it('should be true with same integer', function() {
                _Math.equal(1, 1).should.equal(true)
            })

            it('should be false with distinct integers', function() {
                _Math.equal(1, 2).should.equal(false)
            })

            it('should be true with similar floats', function() {
                _Math.equal(1.01, 1.02, 1).should.equal(true)
            })

            it('should be false with slightly distinct floats', function() {
                _Math.equal(1, 1.1, 1).should.equal(false)
            })

            it('should truncate, not round', function() {
                _Math.equal(1, 1.9).should.equal(true)
            })
        })

        describe('polarity()', function() {
            it('should be 1 with a positive number', function() {
                _Math.polarity(5).should.equal(1)
            })

            it('should be -1 with a negative number', function() {
                _Math.polarity(-5).should.equal(-1)
            })
        })
    })
})
