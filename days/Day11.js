const getInput = require("../util");

const getPairIndexes = (arr, stars, emptyLines, emptyColumns, enlarging) => {
  const starsIndexes = {};

  arr.forEach((e, i)=> {
    for(let l = 1; l < stars; l++) {
      const index = e.findIndex(s => s=== l.toString());
      let line = i;
      let column = index;

      for(let eL = 0; eL < emptyLines.length; eL++) {
        if(i > emptyLines[eL]) {
          line += enlarging;
        }
      }

      for(let eC = 0; eC < emptyColumns.length; eC++) {
        if(index > emptyColumns[eC]) {
          column += enlarging;
        }
      }

      if(column >= 0) {
        starsIndexes[l] = {l: line, c: column};
      }
    }
  })
  return starsIndexes;
}

const getPairs = stars => {
  const pairs = [];

  let i = 1;
    while(i < stars) {
      let pair = i + 1;
      while(pair < stars) {
        pairs.push([i, pair]);
        pair++;
      }
      i++;
    }
    return pairs;
}

const getEmptyColumnsAndLines = universe => {
  const emptyLines = [];
  const columns = Array.from({length: universe[0].length}, () => false);
  let counter = 1;

  for (let l = 0; l < universe.length; l++) {
    let hasStars = false;
    for(let c = 0; c < universe[l].length; c++ ) {
      if(universe[l][c] !== '.') {
        hasStars = true;
        columns[c] = true;
        universe[l][c] = counter.toString();
        counter += 1;
      }
    }
    if(!hasStars) {
      emptyLines.push(l);
    }
  }
  const emptyColumns = columns.map((col, i) => col ? col : col = i).filter(e => typeof e === 'number');
  return {emptyLines, emptyColumns, counter}
}

const getTotalDistance = (pairs, starsIndexes) => pairs.reduce((acc, e) => {
  const sec = starsIndexes[e[1]];
  const first = starsIndexes[e[0]];
  const total = Math.abs(sec.l - first.l) + Math.abs(sec.c - first.c);
  return acc + total;
}, 0)

const dayElevenPart1 =  () => { 
  const universe = getInput("input_day11").map(e => e.split('')); 
  const {emptyLines, emptyColumns, counter} = getEmptyColumnsAndLines(universe);
  const starsIndexes = getPairIndexes(universe, counter, emptyLines, emptyColumns, 1);
  const pairs = getPairs(counter);
  return getTotalDistance(pairs, starsIndexes);
}

console.log(`Day 11 part 01 result is: ${dayElevenPart1()}`)

const dayElevenPart2 =  () => { 
  const universe = getInput("input_day11").map(e => e.split('')); 
  const {emptyLines, emptyColumns, counter} = getEmptyColumnsAndLines(universe);
  const starsIndexes = getPairIndexes(universe, counter, emptyLines, emptyColumns, 999_999);
  const pairs = getPairs(counter);
  return getTotalDistance(pairs, starsIndexes);
}

console.log(`Day 11 part 02 result is: ${dayElevenPart2()}`)