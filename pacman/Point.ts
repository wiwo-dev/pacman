import { Position } from "./TypesAndSettings";

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
