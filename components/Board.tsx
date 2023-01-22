import { BOARD_SIZE, FIELD_SIZE } from "@/pacman";
import React, { ReactElement } from "react";

type Props = { children: any };

export default function Board({ children }: Props) {
  return (
    <div
      className={`bg-gray-900 relative`}
      style={{
        width: BOARD_SIZE.x * FIELD_SIZE,
        height: BOARD_SIZE.y * FIELD_SIZE,
      }}>
      {children}
    </div>
  );
}
