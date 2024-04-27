import type { AppConfig } from "./apps";

export interface AppProps {
  config: Pick<AppConfig, "packageName" | "path">;
}

export { AppConfig };
