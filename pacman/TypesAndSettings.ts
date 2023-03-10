export const BOARD_SIZE = {
  x: 28,
  y: 31,
};

export const FIELD_SIZE = 22; //22
export const GHOSTS_LOCKED_TIME = 10; //10
export const ENERGIZER_TIME = 30;

//* animation duration 0.3 for normal and 0.6 for slower */
export const SPEED_MAIN = 280;
export const SPEED_MOVING_CELL_NORMAL = SPEED_MAIN * 0.001; //0.3
export const SPEED_MOVING_CELL_SLOW = SPEED_MAIN * 0.002; //0.6

//points
export const POINTS_FOR_GHOST = 10;
export const POINTS_FOR_BASIC_PILL = 1;
export const POINTS_FOR_ENERGIZER_PILL = 5;

export const GAME_LIVES = 3;

export type DirectionsType = "U" | "D" | "L" | "R";
export type WallType = "horizontal" | "vertical" | "tl" | "tr" | "bl" | "br";
export type Position = { x: number; y: number };
export type PillType = "basic" | "energizer";

export const keepPositionInBounds = ({ x, y }: { x: number; y: number }): { x: number; y: number } => {
  const keepNumInBounds = (pos: number, board_max: number) => {
    if (pos < 0) return board_max + pos;
    return pos % board_max;
  };
  return { x: keepNumInBounds(x, BOARD_SIZE.x), y: keepNumInBounds(y, BOARD_SIZE.y) };
};
