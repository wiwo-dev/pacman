import { Board } from "./Board";
import { Game } from "./Game";
import { Point } from "./Point";
import {
  DirectionsType,
  POINTS_FOR_ENERGIZER_PILL,
  POINTS_FOR_BASIC_PILL,
  PillType,
  Position,
  keepPositionInBounds,
  POINTS_FOR_GHOST,
} from "./TypesAndSettings";

export class Pacman extends Point {
  board: Board;
  direction: DirectionsType = "R";
  game: Game;
  constructor(x: number, y: number, board: Board, game: Game) {
    super(x, y);
    this.board = board;
    this.game = game;
    this.direction = "R";
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

  move() {
    if (this.game.status === "GAME_OVER") return;
    const nextPosition = this.calculateNextPosition(this.direction);

    //ghost check
    if (this.game.checkIfGhost(this.position) || this.game.checkIfGhost(nextPosition)) {
      if (this.game.status === "ENERGIZER") {
        //pacman EATING A GHOST DURING ENERGIZER
        //find the ghost
        const ghostIndex = this.game.ghosts.findIndex(
          (el) =>
            (el.position.x === this.position.x && el.position.y == this.position.y) ||
            (el.position.x === nextPosition.x && el.position.y === nextPosition.y)
        );
        this.game.ghosts[ghostIndex].setEatenStatus();
        this.game.addPoint(POINTS_FOR_GHOST);
      } else {
        console.log("KILLED");
        this.game.handleKilledEvent();
      }
    }
    if (this.board.checkIfPill(nextPosition)) {
      //add point and remove pill from the board
      const removedPill = this.board.removePill(nextPosition);
      this.game.addPoint(removedPill?.pillType === "energizer" ? POINTS_FOR_ENERGIZER_PILL : POINTS_FOR_BASIC_PILL);
      if (removedPill?.pillType === "energizer") {
        this.game.startEnergizer();
        this.game.ghosts.forEach((ghost) => (ghost.status = "ENERGIZER"));
      }
    }
    //WALL check
    if (this.board.checkIfWall(nextPosition)) return;
    this.setPosition(nextPosition);
  }

  tryToChangeDirection(direction: DirectionsType) {
    const nextPosition = this.calculateNextPosition(direction);
    if (this.board.checkIfWall(nextPosition)) return;
    else this.direction = direction;
  }
}
