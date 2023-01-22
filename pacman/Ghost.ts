import { astar } from "@/utils/pathfinder";
import { Board } from "./Board";
import { Game } from "./Game";
import { BOARD_SIZE, DirectionsType, Position, keepPositionInBounds } from "./TypesAndSettings";
import { Point } from "./Point";

type GhostStatus = "ALIVE" | "EATEN";

export class Ghost extends Point {
  color: string;
  board: Board;
  direction: DirectionsType = "R";
  game: Game;
  path: Position[];
  status: GhostStatus = "ALIVE";

  constructor(
    x: number,
    y: number,
    board: Board,
    game: Game,
    color: string,
    public initialTarget: Position,
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
    if (this.status === "EATEN") {
      this.moveEnergizer();
      return;
    }

    this.moveNormal();
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

  //energizer or locked state state
  moveRandom() {
    this.clearShortestPath();
    //change direction sometimes
    if (Math.random() < 0.4) this.direction = this.getRandomPossibleDirection();
    const nextPosition = this.calculateNextPosition(this.direction);
    if (this.board.checkIfWall(nextPosition)) this.direction = this.getRandomPossibleDirection();
    else {
      this.setPosition(this.calculateNextPosition(this.direction));
      //this.findShortestPath();
    }
  }

  moveEnergizer() {
    if (this.speedCycle > 0) {
      this.moveRandom();
      this.speedCycle = 0;
    } else this.speedCycle++;
  }

  moveEaten() {
    for (let i = 0; i < 3; i++) {
      this.moveNormal({ x: 14, y: 14 });
      if (this.position.x === 14 && this.position.y === 14) this.status = "ALIVE";
    }
  }

  isGhostEaten() {
    if (this.status === "EATEN") return true;
    return false;
  }

  moveLocked() {
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
    console.log(this.name, " IS EATEN");
  }
}
