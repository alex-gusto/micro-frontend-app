import { useCoreServices } from "@mf/core";
import { Timeline, Button, Flex } from "antd";
import { heavyLogic } from "./domain";
import { TimesSelect } from "./TimesSelect";

export const App = () => {
  const { BaseService } = useCoreServices();

  const onWorker = async () => {
    const worker = new Worker("/workers/mf2.worker.js", { type: "module" });

    const data = await new Promise((resolve) => {
      worker.addEventListener("message", (event) => {
        resolve(event.data);
      });

      worker.postMessage({ type: "fudge", payload: 1000 });
    });

    console.log("🚀 ~ onRun ~ worker:", data);
  };

  const onRun = () => {
    heavyLogic(1000);
  };

  return (
    <div className="h-100">
      <Flex>
        <TimesSelect />
        <Button onClick={onRun}>Run</Button>
        <Button onClick={onWorker}>Run Worker</Button>
      </Flex>
      <Timeline items={BaseService.getAll()} />
    </div>
  );
};
