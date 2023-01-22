import { DirectionsType } from "@/pacman";
import React from "react";

type Props = { size: number; color: string };

export default function Ghost({ size = 50, color = "green" }: Props) {
  //console.log(color);
  return (
    <div className="">
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 59L26 91H75.5L84 67.5L65 45.5L64 34L84 27.5L52 16L22.5 19L38.5 35.5L25 59Z" fill={color} />
      </svg>
    </div>
  );
}
