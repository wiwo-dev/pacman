export function astar({ cols = 5, rows = 5, startPos, endPos, obstacles }) {
  //columns in the grid
  //rows in the grid

  let grid = new Array(cols); //array of all the grid points

  let openSet = []; //array containing unevaluated grid points
  let closedSet = []; //array containing completely evaluated grid points

  let start; //starting grid point
  let end; // ending grid point (goal)
  let path = [];

  //heuristic we will be using - Manhattan distance
  //for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
  function heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);

    return d1 + d2;
  }

  //constructor function to create all the grid points as objects containind the data for the points
  function GridPoint(x, y) {
    this.x = x; //x location of the grid point
    this.y = y; //y location of the grid point
    this.f = 0; //total cost function
    this.g = 0; //cost function from start to the current grid point
    this.h = 0; //heuristic estimated cost function from current grid point to the goal
    this.neighbors = []; // neighbors of the current grid point
    this.parent = undefined; // immediate source of the current grid point
    this.isObstacle = false; //flag indicating if the point is an obstacle

    // update neighbors array for a given grid point
    this.updateNeighbors = function (grid) {
      let i = this.x;
      let j = this.y;
      if (i < cols - 1) {
        if (!grid[i + 1][j].isObstacle) this.neighbors.push(grid[i + 1][j]);
      }
      if (i > 0) {
        if (!grid[i - 1][j].isObstacle) this.neighbors.push(grid[i - 1][j]);
      }
      if (j < rows - 1) {
        if (!grid[i][j + 1].isObstacle) this.neighbors.push(grid[i][j + 1]);
      }
      if (j > 0) {
        if (!grid[i][j - 1].isObstacle) this.neighbors.push(grid[i][j - 1]);
      }
    };
  }

  //initializing the grid
  function init() {
    //making a 2D array
    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = new GridPoint(i, j);
      }
    }

    // Set the isObstacle property of the grid points that are obstacles
    for (let i = 0; i < obstacles.length; i++) {
      let x = obstacles[i].x;
      let y = obstacles[i].y;
      grid[x][y].isObstacle = true;
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].updateNeighbors(grid);
      }
    }

    start = grid[startPos.x][startPos.y];
    //end = grid[cols - 1][rows - 1];
    end = grid[endPos.x][endPos.y];

    openSet.push(start);

    //console.log(grid);
  }

  //A star search implementation

  function search() {
    init();
    while (openSet.length > 0) {
      //assumption lowest index is the first one to begin with
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      let current = openSet[lowestIndex];

      if (current === end) {
        let temp = current;
        path.push(temp);
        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }
        //DONE!
        // return the traced path
        return path.reverse();
      }

      //remove current from openSet
      openSet.splice(lowestIndex, 1);
      //add current to closedSet
      closedSet.push(current);

      let neighbors = current.neighbors;

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (!closedSet.includes(neighbor)) {
          let possibleG = current.g + 1;

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          } else if (possibleG >= neighbor.g) {
            continue;
          }

          neighbor.g = possibleG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }

    //no solution by default
    return [];
  }

  return search();
}
