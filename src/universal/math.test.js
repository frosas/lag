import { expect } from "chai";
import { polarity } from "../../src/universal/math";

describe("math", () => {
  describe("polarity()", () => {
    it("is 1 with a positive number", () => {
      expect(polarity(5)).to.equal(1);
    });

    it("is -1 with a negative number", () => {
      expect(polarity(-5)).to.equal(-1);
    });
  });
});
