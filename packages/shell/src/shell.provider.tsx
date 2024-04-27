import type { PropsWithChildren } from 'react';
import { createContext } from 'react';
import type { AppConfig } from './apps';
import { enabledApps } from './apps';

export const ShellContext = createContext<AppConfig[]>([]);

export function ShellProvider(props: PropsWithChildren<unknown>) {
  return <ShellContext.Provider value={enabledApps} {...props} />;
}
