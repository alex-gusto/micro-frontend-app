import { Workbox } from "workbox-window";
import { notification } from "antd";

const NOTIFICATION_KEY = "new_app";

notification.config({
  placement: "bottomRight",
  bottom: 16,
  duration: 3,
});

export const initSW = () => {
  const wb = new Workbox(`/service-worker.js`, { scope: "/" });

  wb.addEventListener("waiting", (event) => {
    if (event.isExternal) return;

    const refresh = () => {
      wb.messageSkipWaiting();
      notification.destroy(NOTIFICATION_KEY);
    };

    notification.info({
      message: "A new version has been released!",
      description: "Would you like to refresh the app?",
      duration: 0,
      key: NOTIFICATION_KEY,
      btn: <button onClick={refresh}>Refresh</button>,
    });
  });

  wb.register();

  const bc = new BroadcastChannel("sw-updates");
  bc.onmessage = (event) => {
    if (event.data.type === "NEW_SW_ACTIVE") {
      // handle the SW update in this tab…
      window.location.reload();
    }
  };
};
