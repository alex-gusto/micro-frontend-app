import { useContext } from "react";
import { ServicesContext } from "./services.provider";

export const useServices = () => {
  return useContext(ServicesContext);
};
