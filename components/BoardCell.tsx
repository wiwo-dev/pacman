import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Position } from "@/pacman/pacman";

type Props = { position: Position; children?: ReactNode; className: string };

import { FIELD_SIZE } from "@/pacman/pacman";

export default function BoardCell({ position, children, className }: Props): JSX.Element {
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
