define(['public/scripts/human-interval'], function(humanInterval) {

    describe('humanInterval()', function() {

        it('should return milliseconds with less than 5 seconds', function() {
            humanInterval(4000).should.equal('4000 ms')
        })

        it('should return seconds with less than a minute', function() {
            humanInterval(60 * 1000 - 1).should.equal('59 s')
        })

        it('should return minutes with less than a hour', function() {
            humanInterval(60 * 60 * 1000 - 1).should.equal('59 m')
        })
    })
})
