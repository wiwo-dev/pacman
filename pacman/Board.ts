import { Pill } from "./Pill";
import { Wall } from "./Wall";
import { boardWalls, pillsData } from "./data/standardBoard";
import { Position, WallType } from "./TypesAndSettings";

export class Board {
  walls: Wall[];
  pills: Pill[] = [];

  checkTypeOfWall = ({
    left,
    right,
    top,
    bottom,
  }: {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
  }): WallType => {
    //    if (left && right && bottom) return "tr";
    if (left && right) return "horizontal";
    if (top && bottom) return "vertical";
    if (bottom && right) return "tl";
    if (bottom && left) return "tr";
    if (top && right) return "bl";
    if (top && left) return "br";
    return "horizontal";
  };

  constructor() {
    const walls = [];
    for (let i = 0; i < boardWalls.length; i++) {
      for (let j = 0; j < boardWalls[i]?.length; j++) {
        const typeOfWall = this.checkTypeOfWall({
          left: boardWalls?.[i]?.[j - 1] ? true : false,
          right: boardWalls?.[i]?.[j + 1] ? true : false,
          top: boardWalls?.[i - 1]?.[j] ? true : false,
          bottom: boardWalls?.[i + 1]?.[j] ? true : false,
        });
        if (boardWalls[i][j]) walls.push(new Wall(j, i, typeOfWall));
      }
    }
    this.walls = walls;

    //pills setting
    for (let i = 0; i < pillsData.length; i++) {
      for (let j = 0; j < pillsData[i]?.length; j++) {
        if (pillsData[i][j] === 1) this.pills.push(new Pill(j, i));
        if (pillsData[i][j] === 2) this.pills.push(new Pill(j, i, "energizer"));
      }
    }
  }

  checkIfWall = (position: Position): boolean => {
    if (this.walls.find((el) => el.position.x === position.x && el.position.y === position.y)) return true;
    else return false;
  };

  checkIfPill = (position: Position): boolean => {
    if (this.pills.find((el) => el.position.x === position.x && el.position.y === position.y)) return true;
    else return false;
  };

  removePill = (position: Position): Pill | null => {
    const index = this.pills.findIndex((el) => el.position.x === position.x && el.position.y === position.y);
    if (index > -1) {
      const removedPill = this.pills[index];
      this.pills.splice(index, 1);
      return removedPill;
    }
    return null;
  };
}
