import React, { useState } from "react";
import { motion } from "framer-motion";
import useInterval from "@/utils/useInterval";
import { GhostStatus } from "@/pacman/Ghost";

type Props = { size: number; color: string; name: string; status: GhostStatus };

export default function Ghost({ size = 50, color = "green", name, status }: Props) {
  let imageUrl1 = `ghosts/ghost-${name}-1.png`;
  let imageUrl2 = `ghosts/ghost-${name}-2.png`;

  if (status === "EATEN" || status === "ENERGIZER") {
    imageUrl1 = `ghosts/ghost-${status}-1.png`;
    imageUrl2 = `ghosts/ghost-${status}-2.png`;
  }

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
