import { describe, expect, it } from "vitest"
import {
  buildInitialSound,
  changeVolume,
  confirmPlaying,
  defaultVolume,
  getDisplayedVolume,
  minUnmutedVolume,
  reportStopped,
  toggleMute,
} from "./sound"

const noneStored = { volume: undefined, isMuted: undefined }

describe("sound", () => {
  describe("buildInitialSound()", () => {
    it("starts muted with the default volume on the first visit", () => {
      expect(buildInitialSound(noneStored)).toEqual({
        volume: defaultVolume,
        isMuted: true,
        isBlocked: false,
      })
    })

    it("starts blocked until the browser plays when it wants sound", () => {
      expect(buildInitialSound({ volume: 0.6, isMuted: false })).toEqual({
        volume: 0.6,
        isMuted: false,
        isBlocked: true,
      })
    })

    it("starts muted when the volume was stored without a mute state", () => {
      expect(buildInitialSound({ volume: 0, isMuted: undefined }).isMuted).toBe(
        true,
      )
      expect(
        buildInitialSound({ volume: 0.6, isMuted: undefined }).isMuted,
      ).toBe(false)
    })

    it("keeps the volume while muted", () => {
      const sound = buildInitialSound({ volume: 0.6, isMuted: true })
      expect(sound).toMatchObject({ volume: 0.6, isBlocked: false })
    })
  })

  describe("getDisplayedVolume()", () => {
    it("shows 0 while muted", () => {
      expect(
        getDisplayedVolume({ volume: 0.6, isMuted: true, isBlocked: false }),
      ).toBe(0)
    })

    it("shows 0 while blocked", () => {
      expect(
        getDisplayedVolume({ volume: 0.6, isMuted: false, isBlocked: true }),
      ).toBe(0)
    })

    it("shows the volume while the sound is on", () => {
      expect(
        getDisplayedVolume({ volume: 0.6, isMuted: false, isBlocked: false }),
      ).toBe(0.6)
    })
  })

  describe("toggleMute()", () => {
    it("mutes keeping the volume", () => {
      const sound = { volume: 0.6, isMuted: false, isBlocked: false }
      expect(toggleMute(sound)).toEqual({ ...sound, isMuted: true })
    })

    it("unmutes restoring the volume", () => {
      const sound = { volume: 0.6, isMuted: true, isBlocked: false }
      expect(toggleMute(sound)).toEqual({ ...sound, isMuted: false })
    })

    it("unmutes when the sound is blocked", () => {
      const sound = { volume: 0.6, isMuted: false, isBlocked: true }
      expect(toggleMute(sound)).toEqual({ ...sound, isBlocked: false })
    })

    it("unmutes to the minimum volume when the volume is lower", () => {
      const sound = { volume: 0.02, isMuted: true, isBlocked: false }
      expect(toggleMute(sound).volume).toBe(minUnmutedVolume)
    })
  })

  describe("changeVolume()", () => {
    it("unmutes with the new volume", () => {
      const sound = { volume: 0.6, isMuted: true, isBlocked: false }
      expect(changeVolume(sound, 0.4)).toEqual({
        volume: 0.4,
        isMuted: false,
        isBlocked: false,
      })
    })

    it("mutes at 0 keeping the previous volume", () => {
      const sound = { volume: 0.6, isMuted: false, isBlocked: false }
      expect(changeVolume(sound, 0)).toEqual({ ...sound, isMuted: true })
    })
  })

  describe("browser reports", () => {
    it("confirms the sound plays", () => {
      const sound = { volume: 0.6, isMuted: false, isBlocked: true }
      expect(confirmPlaying(sound).isBlocked).toBe(false)
    })

    it("blocks the sound when the browser stops it", () => {
      const sound = { volume: 0.6, isMuted: false, isBlocked: false }
      expect(reportStopped(sound).isBlocked).toBe(true)
    })

    it("ignores a stop the user caused by muting", () => {
      const sound = { volume: 0.6, isMuted: true, isBlocked: false }
      expect(reportStopped(sound)).toBe(sound)
    })
  })
})
