import React from "react";

type Props = { changeDirection: Function };

export default function TouchScreenController({ changeDirection }: Props) {
  return (
    <div className="absolute bg-gray-800 bg-opacity-80 w-full h-full opacity-30">
      <div className="w-full h-full bg-pink-300 relative overflow-hidden">
        <div
          onClick={() => changeDirection("U")}
          id="top"
          className="absolute top-1/2 left-1/2 border-2 bg-slate-800 border-red-400 hover:bg-slate-100"
          style={{
            height: "calc(100%/1.414",
            width: "calc(100%/1.414",
            transformOrigin: "0% 0%",
            transform: "rotate(-135deg)",
          }}></div>
        <div
          onClick={() => changeDirection("R")}
          id="right"
          className="absolute top-1/2 left-1/2 border-2 border-red-400 active:bg-slate-100"
          style={{
            height: "calc(100%/1.414",
            width: "calc(100%/1.414",
            transformOrigin: "0% 0%",
            transform: "rotate(-45deg)",
          }}></div>

        <div
          id="bottom"
          onClick={() => changeDirection("D")}
          className="absolute top-1/2 left-1/2 border-2 border-red-400 active:bg-slate-100"
          style={{
            height: "calc(100%/1.414",
            width: "calc(100%/1.414",
            transformOrigin: "0% 0%",
            transform: "rotate(45deg)",
          }}></div>
        <div
          id="left"
          onClick={() => changeDirection("L")}
          className="absolute top-1/2 left-1/2 border-2 border-red-400"
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
