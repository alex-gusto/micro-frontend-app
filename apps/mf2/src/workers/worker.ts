import { heavyLogic } from "../domain";

type FudgeRequest = {
  type: "fudge";
  payload: number;
};

type FudgeResponse =
  | { type: "fudge"; payload: number }
  | { type: "error"; error: string };

declare const self: Worker;

self.addEventListener("message", (event) => {
  const data = event.data as FudgeRequest;

  if (!data || data.type !== "fudge") return;

  try {
    const report = heavyLogic(1000);
    const response: FudgeResponse = { type: "fudge", payload: report };
    self.postMessage(response);
  } catch (error) {
    const response: FudgeResponse = {
      type: "error",
      error: error instanceof Error ? error.message : String(error),
    };
    self.postMessage(response);
  }
});
