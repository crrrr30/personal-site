import { createContext, type RefObject, useContext } from "react";

export const BodyDivContext = createContext<
  RefObject<HTMLElement | null> | undefined
>(undefined);

export const useBodyDivContext = () => useContext(BodyDivContext);
