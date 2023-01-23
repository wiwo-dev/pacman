import { DirectionsType } from "@/pacman";
import useInterval from "@/utils/useInterval";
import React, { useState } from "react";
import PacmanIcon from "./PacmanIcon";

type Props = { size: number; direction: DirectionsType };

export default function Pacman({ size = 50, direction = "R" }: Props) {
  const getDirectionClass = (direction: DirectionsType) => {
    switch (direction) {
      case "R":
        return "";
      case "D":
        return "rotate-90";
      case "L":
        return "rotate-180";
      case "U":
        return "rotate-[270deg]";
      default:
        break;
    }
  };

  const [currentFrame, setCurrentFrame] = useState(0);

  useInterval(() => {
    if (currentFrame === 3) setCurrentFrame(0);
    else setCurrentFrame(currentFrame + 1);
  }, 300);

  return (
    <div className={`${getDirectionClass(direction)} w-full h-full relative`}>
      <div className="w-full h-full relative">
        <PacmanIcon size={size} state={currentFrame} />
      </div>
    </div>
  );
}
