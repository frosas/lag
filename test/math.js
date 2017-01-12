/* eslint-env mocha */

const math = require('../src/browser/math');

require('chai').should();

describe('math', () => {
  describe('polarity()', () => {
    it('should be 1 with a positive number', () => {
      math.polarity(5).should.equal(1);
    });

    it('should be -1 with a negative number', () => {
      math.polarity(-5).should.equal(-1);
    });
  });
});
