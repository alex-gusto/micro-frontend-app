import { createContext, PropsWithChildren, useMemo } from "react";
import { TimelineService, PlansService } from "./services";
import { inversifyContainer } from "./inversify.config";

export const servicesContainer = () => ({
  TimelineService: inversifyContainer.get(TimelineService),
  BaseService: inversifyContainer.get(TimelineService),
});

const ServicesContext = createContext(servicesContainer());

function ServicesProvider({ children }: PropsWithChildren<{}>) {
  const value = useMemo(() => servicesContainer(), []);
  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
}

export { ServicesContext, ServicesProvider };
