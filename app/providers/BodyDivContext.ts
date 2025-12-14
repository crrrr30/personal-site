import { createContext, type RefObject, useContext } from "react";

export const BodyDivContext = createContext<RefObject<HTMLElement> | undefined>(
  undefined,
);

export const useBodyDivContext = () => useContext(BodyDivContext);
