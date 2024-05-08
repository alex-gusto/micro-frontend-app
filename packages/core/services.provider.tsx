import { PropsWithChildren, useContext, useMemo } from "react";
import { createContext } from "react";
import _ from "lodash";
console.log(_);

export type CoreServices = {
  BaseService: {
    get: () => any;
    getAll: () => any;
  };
};

const CoreContext = createContext({} as CoreServices);

export const useCoreServices = () => useContext(CoreContext);

export function createProvider(getServices: () => CoreServices) {
  return function CoreProvider({ children }: PropsWithChildren<{}>) {
    const value = useMemo(() => getServices(), []);

    return (
      <CoreContext.Provider value={value}>{children}</CoreContext.Provider>
    );
  };
}
