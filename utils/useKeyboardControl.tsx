import { useCallback, useEffect, useState } from "react";

export type DirectionsType = "U" | "D" | "L" | "R";

const useKeyboardControl = ({
  onChange,
  onSpace,
  onEscape,
}: {
  onChange: (direction: DirectionsType) => void;
  onSpace: () => void;
  onEscape: () => void;
}) => {
  const [direction, setDirection] = useState<DirectionsType>("R");
  const [paused, setPaused] = useState<true | false>(false);

  const keyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "ArrowUp") {
        setDirection("U");
        onChange("U");
      } else if (e.code === "ArrowDown") {
        setDirection("D");
        onChange("D");
      } else if (e.code === "ArrowLeft") {
        setDirection("L");
        onChange("L");
      } else if (e.code === "ArrowRight") {
        setDirection("R");
        onChange("R");
      } else if (e.key === " " || e.code === "Space") {
        setPaused(!paused);
        onSpace();
      } else if (e.key === "Escape") {
        onEscape();
      }
    },
    [onChange, paused, onSpace, onEscape]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [keyPress]);

  return { direction, paused };
};

export default useKeyboardControl;
