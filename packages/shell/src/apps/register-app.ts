import { ActivityFn, registerApplication } from 'single-spa';
import type { AppProps } from '../types';

export const registerApp = (appName: string, activityFn: ActivityFn, customProps?: AppProps) => {
  registerApplication<AppProps>(
    appName,
    () => System.import(`${appName}/app`).then(app => app.default()),
    activityFn,
    customProps,
  );
};
