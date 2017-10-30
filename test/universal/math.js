const math = require("../../src/universal/math");
const expect = require("chai").expect;

describe("math", () => {
  describe("polarity()", () => {
    it("should be 1 with a positive number", () => {
      expect(math.polarity(5)).to.equal(1);
    });

    it("should be -1 with a negative number", () => {
      expect(math.polarity(-5)).to.equal(-1);
    });
  });
});
