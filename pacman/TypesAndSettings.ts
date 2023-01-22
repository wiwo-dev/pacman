export const BOARD_SIZE = {
  x: 28,
  y: 31,
};
export const FIELD_SIZE = 28;
export const GHOSTS_LOCKED_TIME = 10; //10
export const ENERGIZER_TIME = 30;

export type DirectionsType = "U" | "D" | "L" | "R";
export type WallType = "horizontal" | "vertical" | "tl" | "tr" | "bl" | "br";
export type Position = { x: number; y: number };
export type PillType = "basic" | "energizer";

//export type InitialGhostTarget = { x: 1, y: 1 } | { x: 1, y: 29 } | { x: 26; y: 1 } | { x: 26; y: 29 };

export const keepPositionInBounds = ({ x, y }: { x: number; y: number }): { x: number; y: number } => {
  const keepNumInBounds = (pos: number, board_max: number) => {
    if (pos < 0) return board_max + pos;
    return pos % board_max;
  };
  return { x: keepNumInBounds(x, BOARD_SIZE.x), y: keepNumInBounds(y, BOARD_SIZE.y) };
};
