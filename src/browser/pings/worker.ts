// TODO Disable browser eslint env

import "../error-tracking";
import Request from "./ping/request";

// See https://github.com/Qwaz/webworker-with-typescript/blob/a0c86bd/worker-loader/src/worker.ts
const worker: Worker = self as any;

worker.onmessage = async (event) => {
  // TODO Constraint event.data type
  const { pingId } = event.data;
  switch (event.data.type) {
    case "sent":
      worker.postMessage({ type: "sent", pingId, time: Date.now() });
      try {
        await new Request().loaded;
        worker.postMessage({ type: "pong", pingId, time: Date.now() });
      } catch (error) {
        worker.postMessage({ type: "failed", pingId });
      }
      break;
    default:
      throw new Error("Unknown type");
  }
};
