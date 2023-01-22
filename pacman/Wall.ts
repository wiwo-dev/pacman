import { Point } from "./Point";
import { WallType } from "./TypesAndSettings";

export class Wall extends Point {
  wallType: WallType;
  constructor(x: number, y: number, wallType: WallType = "horizontal") {
    super(x, y);
    this.wallType = wallType;
  }
}
