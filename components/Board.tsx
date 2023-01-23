import { BOARD_SIZE, FIELD_SIZE } from "@/pacman";
import { PacmanContext } from "@/utils/Context";

import React, { ReactElement, useContext } from "react";

type Props = { children: any };

export default function Board({ children }: Props) {
  const { windowWidth, windowHeight, fieldSize } = useContext(PacmanContext);
  const FIELD_SIZE = fieldSize;

  return (
    <div
      className={`bg-gray-900 relative`}
      style={{
        width: BOARD_SIZE.x * FIELD_SIZE,
        height: BOARD_SIZE.y * FIELD_SIZE,
        backgroundImage: "url(board.png)",
        backgroundSize: "cover",
      }}>
      {children}
    </div>
  );
}
