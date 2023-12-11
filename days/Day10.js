const getInput = require("../util");

const directions = {
  north: ['|', '7', 'F', 'S'],
  south: ['|', 'L', 'J', 'S'],
  east: ['-', '7', 'J', 'S'],
  west: ['-', 'L', 'F', 'S']
}

const checkNorth = next => {
  switch (next) {
    case '|':
      return 'north';
    case '7':
      return 'west';
    case 'F':
      return 'east';
    default:
      break;
  }
}

const checkSouth = next => {
  switch (next) {
    case '|':
      return 'south';
    case 'L':
      return 'east';
    case 'J':
      return 'west';
    default:
      break;
  }
}

const checkWest = next => {
  switch (next) {
    case '-':
      return 'west';
    case 'L':
      return 'north';
    case 'F':
      return 'south';
    default:
      break;
  }
}

const checkEast = next => {
  switch (next) {
    case '-':
      return 'east';
    case '7':
      return 'south';
    case 'J':
      return 'north';
    default:
      break;
  }
}

const dayTenPart1 = () => { 
  const input = getInput("input_day10").map(s => s.split(""));
  const current = [];
  let counter = 0;
  const queue = []

  for(let l = 0; l < input.length; l++) {
    for(let r = 0; r < input[l].length; r++) {
      if(input[l][r] === "S") {
        current.push(l);
        current.push(r);
      }
    }
  }

  const getCounter = (currentLine, currentRow, direction) => {
    let keepGoing = true
    let line = currentLine;
    let row = currentRow;
    let dir = direction;

    while(keepGoing) {
      switch (true) {
        case dir === 'north' && line > 0:
          const north = input[line - 1][row]
          if(directions[dir].includes(north)) {
            const newDirection = checkNorth(north);
            line = line - 1;
            dir = newDirection;
            break;
          }
          line = undefined;
          row = undefined;
          break;
        case dir === 'south' && 140 > line:
          const south = input[line + 1][row]
          if(directions[dir].includes(south)) {
            const newDirection = checkSouth(south);
            line = line + 1;
            dir = newDirection;
            break;
          }
          line = undefined;
          row = undefined;
          break;
        case dir === 'west' && row > 0:
          const west = input[line][row - 1]
          if(directions[dir].includes(west)) {
            const newDirection = checkWest(west);
            row = row - 1;
            dir = newDirection;
            break;
          }
          line = undefined;
          row = undefined;
          break;
        case dir === 'east' && 140 > row:
          const east = input[line][row + 1]
          if(directions[dir].includes(east)) {
            const newDirection = checkEast(east);
            row = row + 1;
            dir = newDirection;
            break;
          }
          line = undefined;
          row = undefined;
          break;
        default:
          line = undefined;
          row = undefined;
          break;
      }

      if(line >= 0 && row >= 0) {
        const current = input[line][row];
        if(current === 'S') {
          counter += 1;
          queue.push(input[line][row])
          input[line][row] = "G"
        } else if(current === 'G') {
          keepGoing = false;
        } else if(current === 'V') {
          keepGoing = false;
        } else {
          counter += 1;
          queue.push(input[line][row])
          switch(input[line][row]) {
            case "F":
              input[line][row] = "┏"
              break;
            case "L":
              input[line][row] = "┗"
              break;
            case "J":
              input[line][row] = "┛"
              break;
            case "7":
              input[line][row] = "┓"
              break;
            case "-":
              input[line][row] = "━"
              break;
            case "|":
              input[line][row] = "┃"
              break;

            default:
              break;
          }
        }
      } else {
        keepGoing = false
      }
    }
  }

 
   
  for (const direction in directions) {
    getCounter(current[0], current[1], direction);
  }
  
  const fs = require('fs');
  const path = require('path');

  fs.writeFileSync(
    path.join(__dirname, '../inputs/input_day10_part2.txt'),
    input.map(e => e.join('')).toString().replace(/,/g, '\n'),
  );

  return Math.ceil(counter/2)
}

console.log(`Day 10 part 01 result is: ${dayTenPart1()}`);

const dayTenPart2 = () => { 
  const input = getInput("input_day10_part2").map(e => e.split(''));
  let enclosedTiles = 0;

  for (let line of input) {
    let pipe = 0;
    for (let i = 0; i < line.length; i++) {
      if(line[i] ===  "┛"|| line[i] === "┗" || line[i] === "┃") {
        pipe += 1;
      } else if(line[i] !== "━" && line[i] !== "┏"  && line[i] !== "┓" ) {
        if(pipe % 2 === 0) {
          line[i] = "O";
        } else {
          line[i] = "I";
          enclosedTiles += 1;
        }
      }
    }
  }
  return enclosedTiles;
}

console.log(`Day 10 part 02 result is: ${dayTenPart2()}`);