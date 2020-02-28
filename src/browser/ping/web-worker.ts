// TODO Disable browser eslint env

import Request from "./request";

// See https://github.com/Qwaz/webworker-with-typescript/blob/a0c86bd/worker-loader/src/worker.ts
const worker: Worker = self as any;

worker.onmessage = async event => {
  // TODO Constraint event.data type
  switch (event.data.type) {
    case "requested":
      worker.postMessage({ type: "requested", time: Date.now() });
      try {
        await new Request().loaded;
        worker.postMessage({ type: "responded", time: Date.now() });
      } catch (error) {
        worker.postMessage({ type: "failed" });
      }
      break;
    default:
      throw new Error("Unknown type");
  }
};
