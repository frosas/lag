// TODO Disable browser eslint env

import "../error-tracking"
import Request from "./ping/request"

// See https://github.com/Qwaz/webworker-with-typescript/blob/a0c86bd/worker-loader/src/worker.ts
const worker: Worker = self as any

worker.onmessage = async (event) => {
  // TODO Constraint event.data type
  const { pingId } = event.data
  switch (event.data.type) {
    case "ping": {
      const request = new Request()
      worker.postMessage({ type: "pinged", pingId, time: Date.now() })
      try {
        await request.loaded
        worker.postMessage({ type: "ponged", pingId, time: Date.now() })
      } catch (error) {
        worker.postMessage({ type: "failed", pingId })
      }
      break
    }
    default:
      throw new Error("Unknown type")
  }
}
