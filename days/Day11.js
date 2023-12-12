const getInput = require("../util");

const getPairs = (arr, stars) => {
  const starsIndexes = {}
  const pairs = []

  arr.forEach((e, i)=> {
    for(let l = 1; l < stars; l++) {
        const index = e.findIndex(s => s=== l.toString());
        if(index >= 0) {
          starsIndexes[l] = {l: i, c: index}
        }
      }
    })

  let i = 1;
  while(i < stars) {
    let pair = i + 1;
    while(pair < stars) {
      pairs.push([i, pair]);
      pair++;
    }
    i++;
  }
  return {pairs, starsIndexes};
}

const dayElevenPart1 =  () => { 
  const universe = getInput("input_day11").map(e => e.split('')); 
  const emptyLines = [];
  const emptyColumns = Array.from({length: universe[0].length}, () => false);
  let counter = 1;

  for (let l = 0; l < universe.length; l++) {
    let hasStars = false;
    for(let c = 0; c < universe[l].length; c++ ) {
      if(universe[l][c] !== '.') {
        hasStars = true;
        emptyColumns[c] = true;
        universe[l][c] = counter.toString();
        counter += 1;
      }
    }
    if(!hasStars) {
      emptyLines.push(l);
    }
  }

  emptyLines.reverse().forEach(line => {
    universe.splice(line, 0, Array.from({length: universe[0].length}, () => '.'));
  });

  emptyColumns
    .map((col, i) => col ? col : col = i)
    .filter(e => typeof e === 'number')
    .reverse()
    .forEach(extra => {
      universe.forEach(l =>
         l.splice(extra, 0, '.'));
    });

  const {pairs, starsIndexes} = getPairs(universe, counter);

  return pairs.reduce((acc, e) => {
    const sec = starsIndexes[e[1]];
    const first = starsIndexes[e[0]];
    const total = Math.abs(sec.l - first.l) + Math.abs(sec.c - first.c);
    return acc + total;
  }, 0)
}

console.log(`Day 11 part 01 result is: ${dayElevenPart1()}`)