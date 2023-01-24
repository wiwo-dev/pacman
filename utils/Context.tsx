import { createContext } from "react";
import useWindowDimensions from "./useWindowDimensions";
import { BOARD_SIZE } from "@/pacman";

export interface PacmanContextType {
  windowWidth: number;
  windowHeight: number;
  fieldSize: number;
}

type Props = {
  children: React.ReactNode;
};

export const PacmanContext = createContext<PacmanContextType>({
  windowHeight: 0,
  windowWidth: 0,
  fieldSize: 22,
});

export function PacmanContextProvider({ children }: Props) {
  const { windowWidth, windowHeight } = useWindowDimensions();

  const getFieldSize = () => {
    if (windowWidth > windowHeight) return (windowHeight - 180) / BOARD_SIZE.y;
    else return (windowWidth - 5) / BOARD_SIZE.y;
  };

  const value = {
    fieldSize: getFieldSize(),
    windowWidth,
    windowHeight,
  };

  return <PacmanContext.Provider value={value}>{children}</PacmanContext.Provider>;
}
