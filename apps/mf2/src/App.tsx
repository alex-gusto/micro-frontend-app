import { useCoreServices } from "@mf/core";
import { Timeline } from "antd";
import { TimesSelect } from "./TimesSelect";

export const App = () => {
  const { BaseService } = useCoreServices();
  return (
    <div className="h-100">
      <TimesSelect />
      <Timeline items={BaseService.getAll()} />
    </div>
  );
};
