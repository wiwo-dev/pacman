import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Position } from "@/pacman/pacman";

type Props = { position: Position; duration?: number; children?: ReactNode; className?: string };

import { FIELD_SIZE } from "@/pacman/pacman";

export default function BoardMovingCell({ position, duration = 0.3, children, className }: Props): JSX.Element {
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
