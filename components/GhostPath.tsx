import { FIELD_SIZE, Position } from "@/pacman/TypesAndSettings";
import { PacmanContext } from "@/utils/Context";
import React, { useContext } from "react";

type Props = { path: Position[]; color: string };

export default function GhostPath({ path, color }: Props) {
  const { fieldSize } = useContext(PacmanContext);
  const FIELD_SIZE = fieldSize;
  return (
    <>
      {path.map((el, ind) => (
        <div
          key={ind}
          className={`absolute flex justify-center items-center`}
          style={{
            width: FIELD_SIZE,
            height: FIELD_SIZE,
            left: el.x * FIELD_SIZE,
            top: el.y * FIELD_SIZE,
          }}>
          <div className="w-1/3 h-1/3 backdrop-opacity-75" style={{ backgroundColor: color }}></div>
        </div>
      ))}
    </>
  );
}
