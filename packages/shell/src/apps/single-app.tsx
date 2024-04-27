import { render, unmountComponentAtNode } from 'react-dom';
import type { ElementType } from 'react';
import type { LifeCycles } from 'single-spa';
import { createOrFindEl } from '../utils';
import type { AppProps } from '../types';
import { ShellProvider } from '../shell.provider';

type SingleAppArg = {
  loadApp: () => Promise<ElementType>;
  terminateApp: () => Promise<void>;
};

type SingleApp = (arg: SingleAppArg) => LifeCycles<AppProps>;

export const singleApp: SingleApp = ({ loadApp, terminateApp }) => {
  const bootstrap = () => {
    return Promise.resolve();
  };

  const mount = (props: AppProps) => {
    const { config } = props;
    const el = createOrFindEl(config.packageName);

    return loadApp().then(App =>
      render(
        <ShellProvider>
          <App {...props} />
        </ShellProvider>,
        el,
      ),
    );
  };

  const unmount = (props: AppProps) => {
    const { config } = props;

    return terminateApp().then(() => {
      const el = createOrFindEl(config.packageName);
      unmountComponentAtNode(el);
    });
  };

  return {
    bootstrap,
    mount,
    unmount,
  };
};
