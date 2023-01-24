import { astar } from "@/utils/pathfinder";
import { Board } from "./Board";
import { Game } from "./Game";
import { BOARD_SIZE, DirectionsType, Position, keepPositionInBounds, GHOSTS_LOCKED_TIME } from "./TypesAndSettings";
import { Point } from "./Point";

export type GhostStatus = "ALIVE" | "EATEN" | "GOING_TO_CORNER" | "ENERGIZER" | "LOCKED";

export class Ghost extends Point {
  color: string;
  board: Board;
  direction: DirectionsType = "R";
  game: Game;
  path: Position[];
  status: GhostStatus = "LOCKED";
  lockedDuration: number = GHOSTS_LOCKED_TIME;

  constructor(
    x: number,
    y: number,
    board: Board,
    game: Game,
    color: string,
    public cornerTarget: Position,
    public name: string
  ) {
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

  //step cycle - used to slow down the gosts
  speedCycle: number = 0;

  move() {
    switch (this.status) {
      case "EATEN":
        this.moveEaten();
        break;
      case "GOING_TO_CORNER":
        this.moveToCorner();
        if (this.position.x === this.cornerTarget.x && this.position.y === this.cornerTarget.y) {
          this.status = "ALIVE";
        }
        break;
      case "ENERGIZER":
        this.moveEnergizer();
        break;
      case "LOCKED":
        this.moveLocked();
        break;
      default:
        this.moveNormal();
        break;
    }
  }

  //normal state
  moveNormal(targetPosition: Position = this.game.pacMan.position) {
    this.findShortestPath(targetPosition);
    const nextPosition = this.path?.[1];
    if (
      this.position.x === this.game.pacMan.position.x &&
      this.position.y === this.game.pacMan.position.y &&
      this.status === "ALIVE"
    ) {
      this.game.handleKilledEvent();
    }
    if (nextPosition) this.setPosition(nextPosition);
  }

  moveToCorner() {
    this.moveNormal(this.cornerTarget);
  }

  moveRandom() {
    this.clearShortestPath();
    //change direction sometimes
    if (Math.random() < 0.4) this.direction = this.getRandomPossibleDirection();
    const nextPosition = this.calculateNextPosition(this.direction);
    if (this.board.checkIfWall(nextPosition)) this.direction = this.getRandomPossibleDirection();
    else {
      this.setPosition(this.calculateNextPosition(this.direction));
    }
  }

  moveEnergizer() {
    //speedcycle is to slow down the ghost in energizer mode
    if (this.speedCycle > 0) {
      this.moveRandom();
      this.speedCycle = 0;
    } else this.speedCycle++;
    if (
      this.position.x === this.game.pacMan.position.x &&
      this.position.y === this.game.pacMan.position.y &&
      this.status === "EATEN"
    ) {
      this.status = "EATEN";
    }
  }

  moveEaten() {
    for (let i = 0; i < 3; i++) {
      this.moveNormal({ x: 14, y: 14 });
      if (this.position.x === 14 && this.position.y === 14) {
        //console.log(this.name, "reached base");
        this.status = "LOCKED";
      }
    }
  }

  isGhostEaten() {
    if (this.status === "EATEN") return true;
    return false;
  }

  moveLocked() {
    this.lockedDuration--;
    if (this.lockedDuration === 0) {
      this.status = "GOING_TO_CORNER";
      this.lockedDuration = GHOSTS_LOCKED_TIME;
    }
    this.clearShortestPath();
    const fieldsAllowedInLocked = [
      { x: 12, y: 14 },
      { x: 13, y: 14 },
      { x: 14, y: 14 },
      { x: 15, y: 14 },
    ];
    if (Math.random() < 0.5) this.direction = "R";
    else this.direction = "L";
    let nextPosition = this.calculateNextPosition(this.direction);
    while (fieldsAllowedInLocked.findIndex((el) => el.x === nextPosition.x && el.y === nextPosition.y) < 0) {
      this.direction = this.direction === "L" ? "R" : "L";
      nextPosition = this.calculateNextPosition(this.direction);
    }
    this.setPosition(nextPosition);
  }

  findShortestPath(end: Position = this.game.pacMan.position) {
    const obstacles = this.board.walls.map((wall) => wall.getPosition());
    const result = astar({
      cols: BOARD_SIZE.x,
      rows: BOARD_SIZE.y,
      startPos: this.position,
      endPos: end,
      obstacles,
    });
    this.path = result.map((res) => ({ x: res.x, y: res.y }));
  }

  clearShortestPath() {
    this.path = [this.position];
  }

  setEatenStatus() {
    this.status = "EATEN";
  }

  endEnergizerGhostStatus() {
    if (this.status === "ENERGIZER") this.status = "ALIVE";
  }
}
