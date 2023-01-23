import React, { ReactNode, useContext } from "react";
import { motion } from "framer-motion";
import { Position, SPEED_MOVING_CELL_NORMAL } from "@/pacman/TypesAndSettings";

type Props = { position: Position; duration?: number; children?: ReactNode; className?: string };

import { FIELD_SIZE } from "@/pacman/TypesAndSettings";
import { PacmanContext } from "@/utils/Context";

export default function BoardMovingCell({
  position,
  duration = SPEED_MOVING_CELL_NORMAL,
  children,
  className,
}: Props): JSX.Element {
  const { fieldSize } = useContext(PacmanContext);
  const FIELD_SIZE = fieldSize;

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
