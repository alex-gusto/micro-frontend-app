import { useCoreServices } from "@mf/core";
import { Timeline, Button, Flex } from "antd";
import { initWorker } from "./workers";
import { heavyLogic } from "./domain";
import { TimesSelect } from "./TimesSelect";

export const App = () => {
  const { BaseService } = useCoreServices();

  const onWorker = async () => {
    const data = await new Promise(async (resolve) => {
      const worker = await initWorker();
      worker.addEventListener("message", (event) => {
        resolve(event.data);
      });

      worker.postMessage({ type: "fudge", payload: 1000 });
    });
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
