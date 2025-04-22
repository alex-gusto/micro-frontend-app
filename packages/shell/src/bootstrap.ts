import "./styles.css";
import "@mf/core/styles";
import "./apps/apps-middleware";
import { start } from "single-spa";
import { enabledApps, registerApp, packageShell } from "./apps";
import { initSW } from "./init-sw";

// Register all enabled apps
enabledApps.forEach((app) => {
  registerApp(
    app.packageName,
    (location) => location.pathname.startsWith(app.path),
    { config: app }
  );
});

// Register dashboard app
registerApp(
  packageShell.packageName,
  (location) =>
    location.pathname === "/" ||
    location.pathname.startsWith(packageShell.path),
  { config: packageShell }
);

start();

initSW();
