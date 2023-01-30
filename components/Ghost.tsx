import React, { useState } from "react";
import useInterval from "@/utils/useInterval";
import { GhostStatus } from "@/pacman/Ghost";
import GhostIcon from "./GhostIcon";

type Props = { size: number; color: string; name: string; status: GhostStatus };

export default function Ghost({ size = 30, color = "green", name, status }: Props) {
  const [currentFrame, setCurrentFrame] = useState<1 | 2>(1);

  useInterval(() => {
    if (currentFrame === 2) setCurrentFrame(1);
    else setCurrentFrame(2);
  }, 300);

  return (
    <div className="w-full h-full relative">
      <div className="relative w-full h-full">
        <GhostIcon size={size} animationStep={currentFrame} color={color} status={status} />
      </div>
    </div>
  );
}
