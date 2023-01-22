import { BOARD_SIZE } from "@/pacman/TypesAndSettings";
import React from "react";
import BoardCell from "./BoardCell";

type Props = {};

export default function BoardGrid({}: Props) {
  return (
    <>
      {[...Array(BOARD_SIZE.y)].map((el, rows) => (
        <div key={rows}>
          {[...Array(BOARD_SIZE.x)].map((el, cols) => (
            <BoardCell key={cols} position={{ x: cols, y: rows }} className="border-[0.2px] border-gray-600" />
          ))}
        </div>
      ))}
    </>
  );
}
