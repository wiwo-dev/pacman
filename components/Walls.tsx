import { FIELD_SIZE, WallType } from "@/pacman/TypesAndSettings";
import { Wall } from "@/pacman/Wall";
import React from "react";

type Props = { walls: Wall[] };

function Walls({ walls }: Props) {
  const getStyleForWall = (wallType: WallType): React.CSSProperties => {
    switch (wallType) {
      case "horizontal":
        return { width: `${FIELD_SIZE}px`, height: `${FIELD_SIZE / 2}px` };
        break;
      case "vertical":
        return { width: `${FIELD_SIZE / 2}px`, height: `${FIELD_SIZE}px` };
        break;
      default:
        return {};
        break;
    }
  };

  const getComponentForWall = (wallType: WallType) => {
    switch (wallType) {
      case "horizontal":
        return (
          <div
            className="rounded-md bg-blue-600"
            style={{ width: `${FIELD_SIZE}px`, height: `${FIELD_SIZE / 2}px` }}></div>
        );
      case "vertical":
        return (
          <div
            className="rounded-md bg-blue-600"
            style={{ width: `${FIELD_SIZE / 2}px`, height: `${FIELD_SIZE}px` }}></div>
        );
      case "tl":
        return (
          <div className="relative" style={{ width: `${FIELD_SIZE}px`, height: `${FIELD_SIZE}px` }}>
            <div
              className="rounded-md bg-blue-600 absolute left-1/2 -translate-x-1/2 top-1/2"
              style={{ width: `${FIELD_SIZE / 2}px`, height: `${FIELD_SIZE / 2}px` }}></div>
            <div
              className="rounded-md bg-blue-600 absolute top-1/2 -translate-y-1/2 left-1/2"
              style={{ width: `${FIELD_SIZE / 2}px`, height: `${FIELD_SIZE / 2}px` }}></div>
          </div>
        );
      case "tr":
        return (
          <div className="relative" style={{ width: `${FIELD_SIZE}px`, height: `${FIELD_SIZE}px` }}>
            <div
              className="rounded-md bg-blue-600 absolute left-1/2 -translate-x-1/2 top-1/2"
              style={{ width: `${FIELD_SIZE / 2}px`, height: `${FIELD_SIZE / 2}px` }}></div>

            <div
              className="rounded-md bg-blue-600 absolute top-1/2 -translate-y-1/2 "
              style={{ width: `${FIELD_SIZE / 2}px`, height: `${FIELD_SIZE / 2}px` }}></div>
          </div>
        );
      case "br":
        return (
          <div className="relative" style={{ width: `${FIELD_SIZE}px`, height: `${FIELD_SIZE}px` }}>
            <div
              className="rounded-md bg-blue-600 absolute left-1/2 -translate-x-1/2"
              style={{ width: `${FIELD_SIZE / 2}px`, height: `${FIELD_SIZE / 2}px` }}></div>
            <div
              className="rounded-md bg-blue-600 absolute top-1/2 -translate-y-1/2 "
              style={{ width: `${FIELD_SIZE / 2}px`, height: `${FIELD_SIZE / 2}px` }}></div>
          </div>
        );
      case "bl":
        return (
          <div className="relative" style={{ width: `${FIELD_SIZE}px`, height: `${FIELD_SIZE}px` }}>
            <div
              className="rounded-md bg-blue-600 absolute left-1/2 -translate-x-1/2"
              style={{ width: `${FIELD_SIZE / 2}px`, height: `${FIELD_SIZE / 2}px` }}></div>
            <div
              className="rounded-md bg-blue-600 absolute top-1/2 -translate-y-1/2 left-1/2"
              style={{ width: `${FIELD_SIZE / 2}px`, height: `${FIELD_SIZE / 2}px` }}></div>
          </div>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <>
      {walls.map((wall, ind) => (
        <div
          key={ind}
          style={{
            width: `${FIELD_SIZE}px`,
            height: `${FIELD_SIZE}px`,
            left: wall.position.x * FIELD_SIZE,
            top: wall.position.y * FIELD_SIZE,
          }}
          className="flex justify-center items-center absolute">
          {getComponentForWall(wall.wallType)}
        </div>
      ))}
    </>
  );
}

export default Walls;
