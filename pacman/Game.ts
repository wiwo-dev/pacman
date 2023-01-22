import { Board } from "./Board";
import { Ghost } from "./Ghost";
import { PacMan } from "./Pacman";

import { ENERGIZER_TIME, GHOSTS_LOCKED_TIME, Position } from "./TypesAndSettings";

//export type InitialGhostTarget = { x: 1, y: 1 } | { x: 1, y: 29 } | { x: 26; y: 1 } | { x: 26; y: 29 };

export class Game {
  status: "GHOSTS_LOCKED" | "GHOSTS_GOING_TO_CORNERS" | "RUNNING" | "ENERGIZER" | "KILLED" | "GAME_OVER";
  livesRemaining: number = 3;
  points: number = 0;
  board: Board;
  pacMan: PacMan;
  ghosts: Ghost[] = [];
  constructor() {
    //this.status = "RUNNING";
    this.status = "GHOSTS_LOCKED";
    this.board = new Board();
    this.pacMan = new PacMan(13, 23, this.board, this);
    this.ghosts.push(new Ghost(14, 14, this.board, this, "#FCB5FF", { x: 1, y: 1 }, "PINK"));
    this.ghosts.push(new Ghost(14, 14, this.board, this, "#00FFFF", { x: 1, y: 29 }, "BLUE"));
    this.ghosts.push(new Ghost(13, 14, this.board, this, "#FF0000", { x: 26, y: 1 }, "RED"));
    this.ghosts.push(new Ghost(13, 14, this.board, this, "#FEC15B", { x: 26, y: 29 }, "ORANGE"));
  }

  addPoint(num: number = 1) {
    this.points = this.points + num;
  }

  startEnergizer() {
    this.status = "ENERGIZER";
    this.remainingEnergizerTime = ENERGIZER_TIME;
  }

  endEnergizer() {
    this.status = "RUNNING";
    this.remainingEnergizerTime = ENERGIZER_TIME;
  }

  remainingEnergizerTime: number = ENERGIZER_TIME;
  remainingLockedTime: number = GHOSTS_LOCKED_TIME;
  makeGameStep() {
    this.pacMan.move();
    //GHOSTS_LOCKED state
    if (this.status === "GHOSTS_LOCKED") {
      this.remainingLockedTime--;
      if (!this.remainingLockedTime) {
        this.endStatusGhostsLocked();
      }
      for (const ghost of this.ghosts) {
        ghost.moveLocked();
      }
    }

    //GHOSTS_GOING_TO_CORNERS
    if (this.status === "GHOSTS_GOING_TO_CORNERS") {
      for (const ghost of this.ghosts) {
        ghost.moveNormal(ghost.initialTarget);
        if (ghost.position.x === ghost.initialTarget.x && ghost.position.y === ghost.initialTarget.y) {
          //end of state
          this.endStatusGhostsGoingToCorners();
        }
      }
    }

    //RUNNING state
    if (this.status === "RUNNING") {
      for (const ghost of this.ghosts) {
        if (ghost.isGhostEaten()) ghost.moveEaten();
        else ghost.move();
      }
    }

    //energizer state
    if (this.status === "ENERGIZER") {
      for (const ghost of this.ghosts) {
        if (ghost.isGhostEaten()) ghost.moveEaten();
        else ghost.moveEnergizer();
      }

      this.remainingEnergizerTime--;
      if (!this.remainingEnergizerTime) this.endEnergizer();
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
    this.pacMan = new PacMan(13, 23, this.board, this);
    this.ghosts = [];
    this.remainingLockedTime = GHOSTS_LOCKED_TIME;
    this.ghosts.push(new Ghost(14, 14, this.board, this, "#FCB5FF", { x: 1, y: 1 }, "PINK"));
    this.ghosts.push(new Ghost(14, 14, this.board, this, "#00FFFF", { x: 1, y: 29 }, "BLUE"));
    this.ghosts.push(new Ghost(13, 14, this.board, this, "#FF0000", { x: 26, y: 1 }, "RED"));
    this.ghosts.push(new Ghost(13, 14, this.board, this, "#FEC15B", { x: 26, y: 29 }, "ORANGE"));
  }

  setStatusKilled() {
    this.status = "KILLED";
  }

  setStatusGhostsLocked() {
    this.status = "GHOSTS_LOCKED";
  }

  endStatusGhostsLocked() {
    this.status = "GHOSTS_GOING_TO_CORNERS";
  }

  endStatusGhostsGoingToCorners() {
    this.status = "RUNNING";
  }
}
