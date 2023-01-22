import { throws } from "assert";
import { boardWalls, pillsData } from "./data/standardBoard";

import { astar } from "@/utils/pathfinder";

export const BOARD_SIZE = {
  x: 28,
  y: 31,
};
export const FIELD_SIZE = 18;

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

export class Point {
  position: Position;
  constructor(x: number, y: number) {
    this.position = { x, y };
  }
  getPosition() {
    return this.position;
  }
  setPosition({ x, y }: Position) {
    this.position.x = x;
    this.position.y = y;
  }
}

export class Wall extends Point {
  wallType: WallType;
  constructor(x: number, y: number, wallType: WallType = "horizontal") {
    super(x, y);
    this.wallType = wallType;
  }
}

export class PacMan extends Point {
  board: Board;
  direction: DirectionsType = "R";
  game: Game;
  constructor(x: number, y: number, board: Board, game: Game) {
    super(x, y);
    this.board = board;
    this.game = game;
  }

  calculateNextPosition(direction: DirectionsType): Position {
    let newPosition: Position;
    switch (direction) {
      case "R":
        newPosition = keepPositionInBounds({ ...this.position, x: this.position.x + 1 });
        break;
      case "L":
        newPosition = keepPositionInBounds({ ...this.position, x: this.position.x - 1 });
        break;
      case "U":
        newPosition = keepPositionInBounds({ ...this.position, y: this.position.y - 1 });
        break;
      case "D":
        newPosition = keepPositionInBounds({ ...this.position, y: this.position.y + 1 });
        break;
      default:
        newPosition = { ...this.position };
        break;
    }
    return newPosition;
  }

  move(direction: DirectionsType) {
    const nextPosition = this.calculateNextPosition(direction);
    if (this.board.checkIfWall(nextPosition)) return;
    else {
      if (this.board.checkIfPill(nextPosition)) {
        //add point and remove pill from the board
        const removedPill = this.board.removePill(nextPosition);
        this.game.addPoint(removedPill?.pillType === "energizer" ? 5 : 1);
      }
      this.setPosition(this.calculateNextPosition(direction));
    }
  }

  tryToChangeDirection(direction: DirectionsType) {
    const nextPosition = this.calculateNextPosition(direction);
    if (this.board.checkIfWall(nextPosition)) return;
    else this.direction = direction;
  }
}

export class Pill extends Point {
  pillType: PillType;
  constructor(x: number, y: number, pillType: PillType = "basic") {
    super(x, y);
    this.pillType = pillType;
  }
}

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

    for (let i = 0; i < pillsData.length; i++) {
      for (let j = 0; j < pillsData[i]?.length; j++) {
        if (pillsData[i][j]) this.pills.push(new Pill(j, i));
      }
    }
  }

  checkIfWall = (position: Position): boolean => {
    const found = this.walls.filter((el) => el.position.x === position.x && el.position.y === position.y).length;
    if (found > 0) return true;
    else return false;
  };

  checkIfPill = (position: Position): boolean => {
    if (this.pills.filter((el) => el.position.x === position.x && el.position.y === position.y).length > 0) return true;
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

export class Game {
  board: Board;
  pacMan: PacMan;
  points: number;
  ghosts: Ghost[] = [];
  constructor() {
    this.board = new Board();
    this.points = 0;
    this.pacMan = new PacMan(13, 23, this.board, this);
    this.ghosts.push(new Ghost(14, 14, this.board, this, "green"));
    this.ghosts.push(new Ghost(1, 1, this.board, this, "red"));
  }

  addPoint(num: number = 1) {
    this.points = this.points + num;
  }

  //step cycle - used to slow down the gosts
  cycle: number = 0;
  makeGameStep() {
    if (this.cycle > 0) {
      for (const ghost of this.ghosts) {
        ghost.move();
      }
      this.cycle = 0;
    } else this.cycle++;
  }
}

export class Ghost extends Point {
  color: string;
  board: Board;
  direction: DirectionsType = "R";
  game: Game;
  path: Position[];

  constructor(x: number, y: number, board: Board, game: Game, color: string) {
    super(x, y);
    this.board = board;
    this.game = game;
    this.color = color;
    this.path = [this.position];
    this.findShortestPath();
  }

  calculateNextPosition(direction: DirectionsType): Position {
    let newPosition: Position;
    switch (direction) {
      case "R":
        newPosition = keepPositionInBounds({ ...this.position, x: this.position.x + 1 });
        break;
      case "L":
        newPosition = keepPositionInBounds({ ...this.position, x: this.position.x - 1 });
        break;
      case "U":
        newPosition = keepPositionInBounds({ ...this.position, y: this.position.y - 1 });
        break;
      case "D":
        newPosition = keepPositionInBounds({ ...this.position, y: this.position.y + 1 });
        break;
      default:
        newPosition = { ...this.position };
        break;
    }
    return newPosition;
  }

  getRandomDirection() {
    const directions: DirectionsType[] = ["D", "L", "R", "U"];
    return directions[Math.floor(Math.random() * 4)];
  }

  getRandomPossibleDirection() {
    let nextDirection = this.getRandomDirection();
    let nextPosition = this.calculateNextPosition(nextDirection);
    while (this.board.checkIfWall(nextPosition)) {
      nextDirection = this.getRandomDirection();
      nextPosition = this.calculateNextPosition(nextDirection);
    }
    return nextDirection;
  }

  move() {
    this.findShortestPath();
    const nextPosition = this.path?.[1];
    if (nextPosition) this.setPosition(nextPosition);
  }

  moveRandom() {
    //change direction sometimes
    if (Math.random() < 0.7) this.direction = this.getRandomPossibleDirection();
    const nextPosition = this.calculateNextPosition(this.direction);
    if (this.board.checkIfWall(nextPosition)) this.direction = this.getRandomPossibleDirection();
    else {
      this.setPosition(this.calculateNextPosition(this.direction));
      this.findShortestPath();
    }
  }

  findShortestPath() {
    const obstacles = this.board.walls.map((wall) => wall.getPosition());
    const result = astar({
      cols: BOARD_SIZE.x,
      rows: BOARD_SIZE.y,
      startPos: this.position,
      endPos: this.game.pacMan.position,
      obstacles,
    });
    this.path = result.map((res) => ({ x: res.x, y: res.y }));
  }
}
