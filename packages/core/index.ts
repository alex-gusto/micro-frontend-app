import {
  type CoreServices,
  createProvider,
  useCoreServices,
} from "./services.provider";

export const initContext = (getServices: () => CoreServices) => {
  return {
    CoreProvider: createProvider(getServices),
  };
};

export { useCoreServices };

export * from "./AppVersion";
