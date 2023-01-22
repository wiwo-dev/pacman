import { Point } from "./Point";
import { PillType } from "./TypesAndSettings";

export class Pill extends Point {
  pillType: PillType;
  constructor(x: number, y: number, pillType: PillType = "basic") {
    super(x, y);
    this.pillType = pillType;
  }
}
