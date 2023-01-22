import { FIELD_SIZE, Pill, PillType } from "@/pacman/TypesAndSettings";
import React from "react";

type Props = { pills: Pill[] };

function Pills({ pills }: Props) {
  const getStyleForPillType = (pillType: PillType): React.CSSProperties => {
    switch (pillType) {
      case "energizer":
        return { width: `${FIELD_SIZE * 0.8}px`, height: `${FIELD_SIZE * 0.8}px` };
        break;
      case "basic":
        return { width: `${FIELD_SIZE * 0.3}px`, height: `${FIELD_SIZE * 0.3}px` };
        break;
      default:
        return {};
        break;
    }
  };

  const classNamesForPills = "rounded-md bg-blue-600";

  const getComponentForPill = (pillType: PillType) => {
    switch (pillType) {
      case "energizer":
        return (
          <div
            className="rounded-md bg-pink-300"
            style={{ width: `${FIELD_SIZE * 0.8}px`, height: `${FIELD_SIZE * 0.8}px` }}></div>
        );
      case "basic":
        return (
          <div
            className="rounded-md bg-pink-300"
            style={{ width: `${FIELD_SIZE * 0.3}px`, height: `${FIELD_SIZE * 0.3}px` }}></div>
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
