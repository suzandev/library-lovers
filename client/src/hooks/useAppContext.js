import { useContext } from "react";
import { AppContext } from "../context/Provider";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("AppContext must be used within a Provider");

  return context;
};
