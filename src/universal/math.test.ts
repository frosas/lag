import { describe, expect, it } from "vitest"
import { polarity } from "./math"

describe("math", () => {
  describe("polarity()", () => {
    it("is 1 with a positive number", () => {
      expect(polarity(5)).toBe(1)
    })

    it("is -1 with a negative number", () => {
      expect(polarity(-5)).toBe(-1)
    })
  })
})
