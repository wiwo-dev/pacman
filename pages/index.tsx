import Head from "next/head";
import useInterval from "@/utils/useInterval";
import useKeyboardControl from "@/utils/useKeyboardControl";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { BOARD_SIZE, DirectionsType } from "@/pacman";

import { Game } from "@/pacman/Game";

import Walls from "@/components/Walls";
import Pills from "@/components/Pills";
import Pacman from "@/components/Pacman";
import Ghost from "@/components/Ghost";
import Board from "@/components/Board";
import BoardCell from "@/components/BoardCell";
import BoardMovingCell from "@/components/BoardMovingCell";
import BoardGrid from "@/components/BoardGrid";
import GhostPath from "@/components/GhostPath";
import TouchScreenController from "@/components/TouchScreenController";
import { SPEED_MAIN, SPEED_MOVING_CELL_NORMAL, SPEED_MOVING_CELL_SLOW } from "@/pacman/TypesAndSettings";
import { PacmanContext } from "@/utils/Context";

let game = new Game();

export default function Home() {
  const [pacmanPosition, setPacmanPosition] = useState(game.pacMan.getPosition());
  const [points, setPoints] = useState(game.points);
  const [pacManDirection, setPacManDirection] = useState(game.pacMan.direction);

  const { fieldSize } = useContext(PacmanContext);
  const FIELD_SIZE = fieldSize;

  const changeDirection = (intendedDirection: DirectionsType) => {
    game.pacMan.tryToChangeDirection(intendedDirection);
    setPacManDirection(game.pacMan.direction);
  };

  const { direction, paused } = useKeyboardControl({
    onChange(intendedDirection) {
      changeDirection(intendedDirection);
    },
    onEscape: () => {},
    onSpace: () => {},
  });

  const [ghostsPathsVisible, setghostsPathsVisible] = useState(false);

  const makeStep = () => {
    if (paused) return;
    if (game.status === "KILLED") return;
    if (game.status === "GAME_OVER") return;
    game.makeGameStep();
    setPacmanPosition({ ...game.pacMan.getPosition() });
    setPoints(game.points);
    setPacManDirection(game.pacMan.direction);
  };

  const setInterval = useInterval(makeStep, SPEED_MAIN);

  const restartGame = () => {
    game = new Game();
    setPacManDirection(game.pacMan.direction);
    setPacmanPosition(game.pacMan.getPosition());
    setPoints(game.points);
  };

  return (
    <>
      <Head>
        <title>Pac Man</title>
        <meta name="description" content="Pacman Game in React/NextJS and TypeScript" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-screen-lg w-fit mx-auto bg-[#020216] p-5 relative overflow-hidden">
        <section className="my-2 flex justify-between gap-8 items-center md:px-[10%]">
          <div className="w-1/2">
            <div className="flex justify-center gap-5 py-2">
              {game.livesRemaining &&
                [...Array(game.livesRemaining)].map((el, ind) => (
                  <img key={ind} src="pacman/pacman-2.png" className="w-[30px] h-[30px]" />
                ))}
            </div>
            <div className="flex justify-center py-2">
              <p className="text-white font-mono font-extrabold text-xl">SCORE: {points}</p>
            </div>
          </div>
          <div className="text-white font-mono font-extrabold flex flex-col gap-2 items-center w-1/2">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded-full"
              onClick={() => setghostsPathsVisible(!ghostsPathsVisible)}>
              {ghostsPathsVisible ? "HIDE PATHS" : "SHOW PATHS"}
            </button>
            <p className="text-sm">
              POS: {pacmanPosition.x}|{pacmanPosition.y}
            </p>
            <p className="text-sm">{game.status}</p>
          </div>
        </section>

        <main className="bg-[#020216] flex justify-center">
          <Board>
            {/* <BoardGrid /> */}
            {/* duration 0.3 for normal and 0.6 for slower */}
            {/* <Walls walls={game.board.walls} /> */}
            <Pills pills={game.board.pills} />
            <BoardMovingCell position={pacmanPosition}>
              <Pacman size={FIELD_SIZE} direction={pacManDirection} />
            </BoardMovingCell>

            {ghostsPathsVisible && (
              <>
                {game.ghosts.map((el, ind) => (
                  <GhostPath key={ind} path={el.path} color={el.color} />
                ))}
              </>
            )}
            {game.ghosts.map((el, ind) => (
              <BoardMovingCell
                key={ind}
                position={el.position}
                duration={
                  el.status === "EATEN"
                    ? SPEED_MOVING_CELL_NORMAL
                    : game.status === "ENERGIZER"
                    ? SPEED_MOVING_CELL_SLOW
                    : SPEED_MOVING_CELL_NORMAL
                }>
                <Ghost size={FIELD_SIZE} color={el.color} name={el.name} status={el.status} />
              </BoardMovingCell>
            ))}
            {game.status === "GAME_OVER" && (
              <div className=" absolute p-8 bg-gray-800 bg-opacity-80 w-full h-full flex justify-center items-center flex-col gap-3">
                <p className="animate-pulse text-5xl font-extrabold text-red-500">GAME OVER</p>
                <p className="text-2xl font-extrabold text-red-500">POINTS: {game.points}</p>
                <button className="bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded-full" onClick={restartGame}>
                  PLAY AGAIN
                </button>
              </div>
            )}
          </Board>
        </main>
      </main>
      <TouchScreenController
        changeDirection={changeDirection}
        pointerEvents={game.status === "GAME_OVER" ? false : true}
      />
    </>
  );
}
