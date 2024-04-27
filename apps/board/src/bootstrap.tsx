import { App } from "./App";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";

export default async () => {
  const { ShellContext } = await import("@mf/shell");

  return function () {
    const enabledApps = useContext(ShellContext);
    return (
      <BrowserRouter>
        <App enabledApps={enabledApps} />;
      </BrowserRouter>
    );
  };
};

export const terminate = () => {};
