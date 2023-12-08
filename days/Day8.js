const getInput = require("../util");

const getRoutes = (input, nodes) => {
  return input.reduce((acc, r, i) => {
    if(i > 0 && r !== '') {
      [key, directions] = r.split(' = ');
      [left, right] =  directions.replace(/[()\s]/g, "").split(",");
      acc[key] = {L: left, R: right};
      if(nodes && key[key.length - 1] === 'A') {
        nodes.push(key);
      }
    }
    return acc;
  }, {})
};

const getSteps = (instructions, routes, node) => {
  let steps = 0;
  let index = 0;

  while(node !== 'ZZZ') {
    const step = instructions[index];
    node = routes[node][step];
    if(index >= instructions.length - 1) {
      index = 0;
    } else {
      index++;
    }
    steps++;
  }
  return steps;
}

const dayEightPart1 = () => { 
  const input = getInput("input_day8");
  const instructions = input[0];
  let node = 'AAA';
  const routes = getRoutes(input);
  return getSteps(instructions, routes, node);
}

console.log(`Day 08 part 01 result is: ${dayEightPart1()}`);

const getLCM = (stepsArr) => {
  const primeFactorization = new Set();

  for(let s = 0; s < stepsArr.length; s++) {
    let number = stepsArr[s];
    while(number % 2 === 0) {
      primeFactorization.add(2);
      number /= 2;
    }

    for (let i = 3; i <= Math.sqrt(number); i += 2) {
      while (number % i === 0) {
        primeFactorization.add(i);
        number /= i;
      }
    }
    
    if(number > 2) {
      primeFactorization.add(number);
    }
  }

  return Array.from(primeFactorization).reduce((t, e) => t * e, 1);
}

const dayEightPart2 = () => { 
  const input = getInput("input_day8");
  const instructions = input[0];
  const nodes = [];
  const stepsArr = [];

  const routes = getRoutes(input, nodes)

  for(let i = 0; i < nodes.length; i++) {
    let steps = 0;
    let index = 0;

    while(nodes[i][nodes[i].length - 1] !== 'Z') {
      const step = instructions[index];
      nodes[i] = routes[nodes[i]][step];
      if(index >= instructions.length - 1) {
        index = 0;
      } else {
        index++;
      }
      steps++;
    }
    stepsArr.push(steps);
    steps = 0;
    index = 0;
  }  

  return getLCM(stepsArr);
}

console.log(`Day 08 part 02 result is: ${dayEightPart2()}`);
