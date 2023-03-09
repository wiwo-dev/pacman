# Pacman Game 🎮

This is the Pacman game written in React/NextJS and TypeScript.
Styling is done mainly with Tailwind CSS.

You can play it here: https://pacman.wiwo.dev

## Game

Game logic is completely separated from React. To create a Game, use the `Game` class and run `makeGameStep()` on each run of the game loop.

The game loop is done with a custom `useInterval` hook.

### Game states

The game has the following states

- **GHOST_LOCKED** - at the beginning `Ghosts` are locked inside the base in the middle of the screen and are released after 10 seconds. The time can be changed in `pacman/TypesAndSettings.ts`.
- **GHOSTS_GOING_TO_CORNERS** after being released each Ghost goes towards one of the board's corners using the shortest path (Astar algorithm is used).
- **RUNNING** that's the normal state in which the Ghosts are trying to catch Pacman. After each step, the shortest path is calculated using the Astar Pathfinder algorithm.
- **ENERGIZER** Pacman is earning points by eating "pills". The big pills are "energizers" which start this state and make the Ghosts move in random directions. During that phaze Pacman can kill the Ghost. The killed Ghost is moved back to the base, waits there for 10 seconds and is released. First it is going towards one of the board's corners and then starts chasing Pacman.
- **KILLED** that's when Pacman is killed by any of the Ghosts.
- **GAME OVER** after losing 3 lifes.

### Ghost's states

As during some parts of the gameplay each Ghost can have a different state it is also reflected in the `Ghost` class with following statuses/states:

- LOCKED - locked in the base
- ALIVE - normal state while chasing Pacman
- ENERGIZER - when Pacman eats the big pill.
- EATEN - after being eaten/chased by Pacman
- GOING_TO_CORNER - when going towards the board's corner (after being released from the base)

## Pathfinding

Astar pathfinding algorithm is used to calculate the path of each ghost on each step.

**You can show the paths during the gameplay by pressing the button at the top of the screen**

![Pathfinding algorithm preview](https://i.postimg.cc/YSnKHKBp/Screenshot-2023-01-25-at-14-23-09.png)

## Controls

Both the keyboard and touch screen can be used to control the game.
On the desktop use keyboard arrows + space for pausing the game or click the screen.

On mobile, tap the screen. The whole screen is divided into clickable triangles (top, right, bottom, left)
Keyboard control is done using `useKeyboardControl` custom hook.
Mobile/screen control is handled by `TouchScreenController` component which is set to `fixed`

## Responsive

Game is fully responsive and works on all screen sizes. Custom `useWindowDimension` hook is used to determine the correct size of the game field which is then passed to all the components using Context.

## Board and pills

The position of the walls and pills is coded in `pacman/data/standardBoard.ts` as a long array of 0 and 1 for walls (0-no wall, 1-wall) and 0,1 and 2 for pills (0-no pill, 1 - basic pill, 2 energizer pill). Right now it is set as in the original Pacman game but it can be customized.
`Walls` component can be used to generate the walls on the screen for development purposes. Right now it is commented out as it matches the board background.

# Contact

If you have any questions please reach out to me using wojtekwieclawski@gmail.com
Also, check out my portfolio website - I am currently seeking for new job opportunities as a Web Developer.
https://wiwo.dev
