import { Pill } from "@/pacman/Pill";
import { FIELD_SIZE, PillType } from "@/pacman/TypesAndSettings";
import React from "react";

type Props = { pills: Pill[] };

function Pills({ pills }: Props) {
  const classNamesForPills = "rounded-md bg-blue-600";

  const getComponentForPill = (pillType: PillType) => {
    switch (pillType) {
      case "energizer":
        return (
          <div
            className="rounded-full bg-pink-300"
            style={{ width: `${FIELD_SIZE * 0.7}px`, height: `${FIELD_SIZE * 0.7}px` }}></div>
        );
      case "basic":
        return (
          <div
            className="rounded-md bg-pink-300"
            style={{ width: `${FIELD_SIZE * 0.2}px`, height: `${FIELD_SIZE * 0.2}px` }}></div>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <>
      {pills.map((pill, ind) => (
        <div
          key={ind}
          style={{
            width: `${FIELD_SIZE}px`,
            height: `${FIELD_SIZE}px`,
            left: pill.position.x * FIELD_SIZE,
            top: pill.position.y * FIELD_SIZE,
          }}
          className="flex justify-center items-center absolute">
          {getComponentForPill(pill.pillType)}
        </div>
      ))}
    </>
  );
}

export default Pills;
