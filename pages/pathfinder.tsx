import React from "react";
import { astar } from "@/utils/pathfinder";
const FIELD_SIZE = 20;

type Props = {};

const obstacles = [
  { x: 1, y: 5 },
  { x: 2, y: 5 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
  { x: 5, y: 5 },
  { x: 6, y: 5 },
  { x: 7, y: 5 },
  { x: 8, y: 5 },
  { x: 9, y: 5 },
  { x: 3, y: 8 },
  { x: 4, y: 8 },
];

const result = astar({
  cols: 10,
  rows: 10,
  startPos: { x: 9, y: 1 },
  endPos: { x: 6, y: 9 },
  obstacles,
});
console.log(result);

//console.log(AStar(grid, start, end));

export default function Page({}: Props) {
  return (
    <div className="absolute">
      {[...Array(10)].map((el, indy) => (
        <div key={indy} className="flex">
          {[...Array(10)].map((el, indx) => (
            <div key={indx} className="w-[20px] h-[20px] border-2 border-red-200"></div>
          ))}
        </div>
      ))}
      {result.map((el, ind) => (
        <GridPoint key={ind} x={el.x} y={el.y} />
      ))}
      {obstacles.map((el, ind) => (
        <GridPoint key={ind} x={el.x} y={el.y} color="red" />
      ))}
    </div>
  );
}

const GridPoint = ({ x, y, color = "blue" }) => {
  return (
    <div
      className="absolute w-[20px] h-[20px]"
      style={{
        left: `${x * FIELD_SIZE}px`,
        top: `${y * FIELD_SIZE}px`,
        backgroundColor: color,
      }}></div>
  );
};
