/* eslint-env mocha */

const math = require('../src/browser/math');

describe('Math', () => {
  describe('equal()', () => {
    it('should be true with same integer', () => {
      math.equal(1, 1).should.equal(true);
    });

    it('should be false with distinct integers', () => {
      math.equal(1, 2).should.equal(false);
    });

    it('should be true with similar floats', () => {
      math.equal(1.01, 1.02, 1).should.equal(true);
    });

    it('should be false with slightly distinct floats', () => {
      math.equal(1, 1.1, 1).should.equal(false);
    });

    it('should truncate, not round', () => {
      math.equal(1, 1.9).should.equal(true);
    });
  });

  describe('polarity()', () => {
    it('should be 1 with a positive number', () => {
      math.polarity(5).should.equal(1);
    });

    it('should be -1 with a negative number', () => {
      math.polarity(-5).should.equal(-1);
    });
  });
});
