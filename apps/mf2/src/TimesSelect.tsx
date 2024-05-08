import { Select } from "antd";
import { Times } from "./domain";

const options = Object.entries(Times).map(([label, value]) => ({
  label,
  value,
}));

export const TimesSelect = () => {
  return <Select className="w-100" options={options} />;
};
