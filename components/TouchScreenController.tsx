import React from "react";

type Props = { changeDirection: Function };

export default function TouchScreenController({ changeDirection }: Props) {
  return (
    <div className="absolute w-full h-full opacity-30">
      <div className="w-full h-full  relative overflow-hidden">
        <div
          onClick={() => changeDirection("U")}
          id="top"
          className="absolute top-1/2 left-1/2   active:bg-slate-100"
          style={{
            height: "calc(100%/1.414",
            width: "calc(100%/1.414",
            transformOrigin: "0% 0%",
            transform: "rotate(-135deg)",
          }}></div>
        <div
          onClick={() => changeDirection("R")}
          id="right"
          className="absolute top-1/2 left-1/2   active:bg-slate-100"
          style={{
            height: "calc(100%/1.414",
            width: "calc(100%/1.414",
            transformOrigin: "0% 0%",
            transform: "rotate(-45deg)",
          }}></div>

        <div
          id="bottom"
          onClick={() => changeDirection("D")}
          className="absolute top-1/2 left-1/2   active:bg-slate-100"
          style={{
            height: "calc(100%/1.414",
            width: "calc(100%/1.414",
            transformOrigin: "0% 0%",
            transform: "rotate(45deg)",
          }}></div>
        <div
          id="left"
          onClick={() => changeDirection("L")}
          className="absolute top-1/2 left-1/2   active:bg-slate-100"
          style={{
            height: "calc(100%/1.414",
            width: "calc(100%/1.414",
            transformOrigin: "0% 0%",
            transform: "rotate(135deg)",
          }}></div>
      </div>
    </div>
  );
}
