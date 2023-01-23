import { Board } from "./Board";
import { Ghost } from "./Ghost";
import { Pacman } from "./Pacman";

import { ENERGIZER_TIME, GHOSTS_LOCKED_TIME, Position } from "./TypesAndSettings";

export class Game {
  status: "GHOSTS_LOCKED" | "GHOSTS_GOING_TO_CORNERS" | "RUNNING" | "ENERGIZER" | "KILLED" | "GAME_OVER";
  livesRemaining: number = 3;
  points: number = 0;
  board: Board;
  pacMan: Pacman;
  ghosts: Ghost[] = [];
  constructor() {
    this.status = "GHOSTS_LOCKED";
    this.board = new Board();
    this.pacMan = new Pacman(13, 23, this.board, this);
    this.ghosts.push(new Ghost(14, 14, this.board, this, "#FCB5FF", { x: 1, y: 1 }, "pink"));
    this.ghosts.push(new Ghost(14, 14, this.board, this, "#00FFFF", { x: 1, y: 29 }, "blue"));
    this.ghosts.push(new Ghost(13, 14, this.board, this, "#FF0000", { x: 26, y: 1 }, "red"));
    this.ghosts.push(new Ghost(13, 14, this.board, this, "#FEC15B", { x: 26, y: 29 }, "orange"));
  }

  addPoint(num: number = 1) {
    this.points = this.points + num;
  }

  startEnergizer() {
    this.status = "ENERGIZER";
    this.remainingEnergizerTime = ENERGIZER_TIME;
  }

  remainingEnergizerTime: number = ENERGIZER_TIME;
  remainingLockedTime: number = GHOSTS_LOCKED_TIME;
  makeGameStep() {
    this.pacMan.move();
    for (const ghost of this.ghosts) ghost.move();
    switch (this.status) {
      case "GHOSTS_LOCKED":
        this.remainingLockedTime--;
        if (!this.remainingLockedTime) this.status = "GHOSTS_GOING_TO_CORNERS";
        break;
      case "GHOSTS_GOING_TO_CORNERS":
        for (const ghost of this.ghosts) {
          if (ghost.position.x === ghost.cornerTarget.x && ghost.position.y === ghost.cornerTarget.y) {
            //end of state
            this.status = "RUNNING";
            this.ghosts.forEach((ghost) => (ghost.status = "ALIVE"));
          }
        }
        break;
      case "ENERGIZER":
        this.remainingEnergizerTime--;
        if (!this.remainingEnergizerTime) {
          this.status = "RUNNING";
          for (const ghost of this.ghosts) {
            ghost.endEnergizerGhostStatus();
          }
          this.remainingEnergizerTime = ENERGIZER_TIME;
        }
        break;

      default:
        break;
    }
  }

  checkIfGhost(position: Position) {
    for (let ghost of this.ghosts) {
      if (ghost.position.x === position.x && ghost.position.y === position.y) return true;
    }
    return false;
  }

  handleKilledEvent() {
    this.setStatusKilled();
    this.livesRemaining--;
    if (this.livesRemaining === 0) {
      //GAME OVER
      this.status = "GAME_OVER";
      return;
    }
    //clear the game and start again
    this.status = "GHOSTS_LOCKED";
    this.board = new Board();
    this.pacMan = new Pacman(13, 23, this.board, this);
    this.ghosts = [];
    this.remainingLockedTime = GHOSTS_LOCKED_TIME;
    this.ghosts.push(new Ghost(14, 14, this.board, this, "#FCB5FF", { x: 1, y: 1 }, "pink"));
    this.ghosts.push(new Ghost(14, 14, this.board, this, "#00FFFF", { x: 1, y: 29 }, "blue"));
    this.ghosts.push(new Ghost(13, 14, this.board, this, "#FF0000", { x: 26, y: 1 }, "red"));
    this.ghosts.push(new Ghost(13, 14, this.board, this, "#FEC15B", { x: 26, y: 29 }, "orange"));
  }

  setStatusKilled() {
    this.status = "KILLED";
  }

  setStatusGhostsLocked() {
    this.status = "GHOSTS_LOCKED";
  }
}
