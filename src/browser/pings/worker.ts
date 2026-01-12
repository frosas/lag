// TODO Disable browser eslint env

import "../error-tracking"
import Request from "./ping/request"

interface OnMessageEventData {
  type: "ping"
  pingId: string
}

export type PostMessageEventData = {
  pingId: string
} & (
  | { type: "pinged"; time: number }
  | { type: "ponged"; time: number }
  | { type: "failed" }
)

declare const self: DedicatedWorkerGlobalScope

function postMessage(message: PostMessageEventData) {
  self.postMessage(message)
}

self.onmessage = async (event: MessageEvent<OnMessageEventData>) => {
  switch (event.data.type) {
    case "ping": {
      const { pingId } = event.data
      const request = new Request()
      postMessage({ type: "pinged", pingId, time: Date.now() })
      try {
        await request.loaded
        postMessage({ type: "ponged", pingId, time: Date.now() })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        postMessage({ type: "failed", pingId })
      }
      break
    }
    default:
      throw new Error("Unknown type")
  }
}
