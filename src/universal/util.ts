import { useReducer } from "react";

export const delay = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const timeout = (duration: number, promise: Promise<unknown>) =>
  Promise.race([
    promise,
    delay(duration).then(() => {
      throw new Error(`Timed out after ${duration} ms`);
    }),
  ]);

// See https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
export const useForceUpdate = () => useReducer((x) => x + 1, 0)[1];
