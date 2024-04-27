export default async () => {
  const { singleApp } = await import("@mf/shell");

  return singleApp({
    loadApp: () => import("./bootstrap").then((m) => m.default()),
    terminateApp: () => import("./bootstrap").then((m) => m.terminate()),
  });
};
