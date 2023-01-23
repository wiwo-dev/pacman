import React, { useState } from "react";
import { motion } from "framer-motion";
import useInterval from "@/utils/useInterval";

type Props = { size: number; color: string; name: string; isAlive: boolean; isEnergizer: boolean };

export default function Ghost({ size = 50, color = "green", name, isAlive, isEnergizer }: Props) {
  const imageUrl1 = `ghosts/ghost-${isEnergizer ? "energized" : isAlive ? name : "killed"}.png`;
  const imageUrl2 = `ghosts/ghost-${isEnergizer ? "energized" : isAlive ? name : "killed"}-2.png`;
  const [image, setImage] = useState(imageUrl1);
  useInterval(() => {
    if (image === imageUrl1) setImage(imageUrl2);
    else setImage(imageUrl1);
  }, 500);

  return (
    <div className="w-full h-full relative">
      <div
        className="absolute w-full h-full"
        style={{ backgroundImage: `url(${image})`, backgroundSize: "contain" }}></div>
    </div>
  );
}
