import { Timeline, TimelineProps } from "antd";

type PreviewProps = {
  items: TimelineProps["items"];
};

export const Preview = ({ items }: PreviewProps) => (
  <Timeline mode="alternate" items={items} />
);
