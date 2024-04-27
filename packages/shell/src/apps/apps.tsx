export type AppConfig = {
  enabled: boolean;
  packageName: string;
  name: string;
  path: string;
};

export const packageShell: AppConfig = {
  enabled: true,
  name: "Board",
  packageName: "@mf/board",
  path: "/shell",
};

export const enabledApps: AppConfig[] = [
  {
    enabled: true,
    name: "Users List",
    packageName: "@mf/mf1",
    path: "/mf1",
  },
  {
    enabled: true,
    name: "Timeline",
    packageName: "@mf/mf2",
    path: "/mf2",
  },
];
