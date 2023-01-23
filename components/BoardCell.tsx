import React, { ReactNode, useContext } from "react";
import { Position } from "@/pacman/TypesAndSettings";

type Props = { position: Position; children?: ReactNode; className: string };

//import { FIELD_SIZE } from "@/pacman/TypesAndSettings";
import { PacmanContext } from "@/utils/Context";

export default function BoardCell({ position, children, className }: Props): JSX.Element {
  const { fieldSize } = useContext(PacmanContext);
  const FIELD_SIZE = fieldSize;
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width: FIELD_SIZE,
        height: FIELD_SIZE,
        left: position.x * FIELD_SIZE,
        top: position.y * FIELD_SIZE,
      }}>
      {children}
    </div>
  );
}
