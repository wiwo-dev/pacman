import { DirectionsType } from "@/pacman";
import useInterval from "@/utils/useInterval";
import React, { useState } from "react";

type Props = { size: number; direction: DirectionsType };

export default function Pacman({ size = 50, direction = "R" }: Props) {
  const getDirectionClass = (direction: DirectionsType) => {
    switch (direction) {
      case "R":
        return "";
      case "D":
        return "rotate-90";
      case "L":
        return "rotate-180";
      case "U":
        return "rotate-[270deg]";
      default:
        break;
    }
  };

  const imageUrl1 = `pacman/pacman.png`;
  const imageUrl2 = `pacman/pacman-1.png`;
  const images = ["pacman/pacman-1.png", "pacman/pacman-2.png", "pacman/pacman-3.png", "pacman/pacman-4.png"];

  const [currentFrame, setCurrentFrame] = useState(0);
  const [image, setImage] = useState(images[currentFrame]);
  useInterval(() => {
    if (currentFrame === images.length - 1) setCurrentFrame(0);
    else setCurrentFrame(currentFrame + 1);
    setImage(images[currentFrame]);
  }, 300);

  return (
    <div className={`${getDirectionClass(direction)} w-full h-full relative`}>
      {/* <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5_6)">
          <path
            d="M98.2117 36.7474C94.9242 24.7879 87.309 14.4771 76.8451 7.81779C66.3812 1.1585 53.8157 -1.3739 41.5893 0.712488C29.3629 2.79887 18.3483 9.35509 10.6851 19.1077C3.02181 28.8603 -0.743081 41.113 0.121674 53.486C0.986429 65.859 6.41909 77.469 15.3645 86.0608C24.3098 94.6526 36.1293 99.6129 48.5271 99.9783C60.9248 100.344 73.0159 96.088 82.4517 88.038C91.8876 79.9879 97.9945 68.718 99.5865 56.4174L50 50L98.2117 36.7474Z"
            fill="#D8CF00"
          />
        </g>
        <defs></defs>
      </svg> */}
      <div className="w-full h-full relative">
        <div
          className="absolute w-full h-full"
          style={{ backgroundImage: `url(${image})`, backgroundSize: "contain" }}></div>
      </div>
    </div>
  );
}
