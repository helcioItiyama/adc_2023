const getInput = require("../util");

const getHistory = () => getInput("input_day9").map(each => each.split(' ').map(num => Number(num)));

const calculatePrediction = (callback, line) => {
  while(!line.every(num => num === 0)) {
    for(let i = 1; i < line.length; i++) {
      line[i - 1] = line[i] - line[i - 1]
      if(i === line.length - 1) callback()
    }
  }
}

const dayNinePart1 = () => { 
  const history = getHistory();
  const total = [];
  let lasts = [];

  for(let l = 0; l < history.length; l++) {
    let line = history[l];
    calculatePrediction(() => lasts.push(line.pop()), line);
    total.push(lasts.reduce((acc, num) => acc + num, 0));
    lasts = [];
  }

 return total.reduce((acc, num) => acc + num, 0);
}

console.log(`Day 09 part 01 result is: ${dayNinePart1()}`);

const calculatePrevious = (arr) => {
  let previous = arr[arr.length - 1];
  for(let i = arr.length - 2; i >= 0; i--) {
    let sub = arr[i] - previous;
    previous = sub;
  }
  return previous;
}

const dayNinePart2 = () => { 
  const history = getHistory();
  const total = [];
  let previous = [];

  for(let l = 0; l < history.length; l++) {
    let line = history[l];
    previous.push(line[0]);

    calculatePrediction(() => {
      line.pop();
      previous.push(line[0]);
    }, line);

    total.push(calculatePrevious(previous))
    previous = [];
  }

 return total.reduce((acc, num) => acc + num, 0);
}


console.log(`Day 09 part 02 result is: ${dayNinePart2()}`);