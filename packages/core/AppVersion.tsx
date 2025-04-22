import { Typography } from "antd";
import { useEffect, useState } from "react";

export function AppVersion() {
  const [version, setVersion] = useState("Foo 12");

  useEffect(() => {
    import("@mf/sw").then(({ VERSION }) => {
      const version = new Intl.DateTimeFormat("en-GB", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(VERSION ?? ""));

      setVersion(version);
    });
  }, []);

  return (
    <Typography.Title type="success" level={5}>
      {version}
    </Typography.Title>
  );
}
