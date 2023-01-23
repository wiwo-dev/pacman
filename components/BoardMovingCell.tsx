import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Position, SPEED_MOVING_CELL_NORMAL } from "@/pacman/TypesAndSettings";

type Props = { position: Position; duration?: number; children?: ReactNode; className?: string };

import { FIELD_SIZE } from "@/pacman/TypesAndSettings";

export default function BoardMovingCell({
  position,
  duration = SPEED_MOVING_CELL_NORMAL,
  children,
  className,
}: Props): JSX.Element {
  return (
    <motion.div
      layout={position.x !== 0}
      transition={{ duration, ease: "linear" }}
      className={`absolute ${className}`}
      style={
        {
          width: FIELD_SIZE,
          height: FIELD_SIZE,
          left: position.x * FIELD_SIZE,
          top: position.y * FIELD_SIZE,
        } as React.CSSProperties
      }>
      {children}
    </motion.div>
  );
}
