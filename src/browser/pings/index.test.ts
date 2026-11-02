import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { PostMessageEventData } from "./worker"
import Pings, { INTERVAL } from "."

type MessageListener = (
  event: Pick<MessageEvent<PostMessageEventData>, "data">,
) => void

class FakeWorker {
  static instance?: FakeWorker
  readonly requestedPingIds: string[] = []
  private readonly _listeners = new Set<MessageListener>()

  constructor() {
    FakeWorker.instance = this
  }

  addEventListener(_type: "message", listener: MessageListener) {
    this._listeners.add(listener)
  }

  removeEventListener(_type: "message", listener: MessageListener) {
    this._listeners.delete(listener)
  }

  postMessage({ pingId }: { pingId: string }) {
    this.requestedPingIds.push(pingId)
  }

  reply(data: PostMessageEventData) {
    for (const listener of [...this._listeners]) listener({ data })
  }
}

type SentPing = { id: string; start: number }

describe("Pings", () => {
  let pings: Pings
  let worker: FakeWorker

  const sendPings = (count: number): SentPing[] =>
    Array.from({ length: count }, () => {
      vi.advanceTimersByTime(INTERVAL)
      const id = worker.requestedPingIds.at(-1)
      if (id === undefined) throw new Error("No ping was requested")
      const start = Date.now()
      worker.reply({ type: "pinged", pingId: id, time: start })
      return { id, start }
    })

  const answerPing = (ping: SentPing) => {
    worker.reply({ type: "ponged", pingId: ping.id, time: Date.now() })
  }

  const failPing = (ping: SentPing) => {
    worker.reply({ type: "failed", pingId: ping.id })
  }

  const getIsInList = (ping: SentPing) =>
    pings.all.some((listedPing) => listedPing.id === ping.id)

  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal("Worker", FakeWorker)
    pings = new Pings({ workerUrl: "worker.js" })
    if (!FakeWorker.instance) throw new Error("No worker was created")
    worker = FakeWorker.instance
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  describe("currentLag", () => {
    describe("after the list dropped some unanswered pings", () => {
      let sent: SentPing[]

      beforeEach(() => {
        sent = sendPings(pings.max + 10)
      })

      it("counts from the answered ping, not from an older unanswered one", () => {
        const answered = sent[5]
        expect(getIsInList(answered)).toBe(false)

        answerPing(answered)

        expect(pings.currentLag).toBe(Date.now() - answered.start)
      })

      it("counts from the oldest unanswered ping, even if it is not in the list", () => {
        const [answered, oldestUnanswered] = sent
        expect(getIsInList(oldestUnanswered)).toBe(false)

        answerPing(answered)
        sendPings(10)

        expect(pings.currentLag).toBe(Date.now() - oldestUnanswered.start)
      })

      it("counts from the oldest unanswered ping when the pings after it failed", () => {
        const [answered, oldestUnanswered, ...others] = sent
        // In reverse order, to cover failures that arrive out of order
        for (const ping of [oldestUnanswered, ...others].reverse())
          failPing(ping)

        answerPing(answered)
        sendPings(10)

        expect(pings.currentLag).toBe(Date.now() - oldestUnanswered.start)
      })
    })
  })
})
