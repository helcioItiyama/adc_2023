const getInput = require("../util");

const equal = (test, condition) => {
  let sequence = '';
  let damaged = '';

  for(let i = 0; i < test.length; i++) {
    if(test[i] === '#') {
      if(i < test.length - 1 && test[i + 1] === '#') {
        damaged += test[i];
      } else {
        damaged += test[i];
        sequence += damaged.length + ',';
        damaged = '';
      }
    } 
  }

  if(sequence[sequence.length - 1] === ',') {
    sequence = sequence.substring(0, sequence.length -1);
  }
  return sequence === condition;
}

const dayTwelvePart1 = () => { 
  const springs = getInput("input_day12").map(s => s.split(' ')); 
  let totalCount = 0;

  for (const spring of springs) {
    let count = 0;

    const searchQuestionAndChange = (string, condition) => {
      const index = string.indexOf('?');

      if(index < 0) {
        if(equal(string, condition)) count++;
        return;
      };

      const head = string.substring(0, index);
      const tail = string.substring(index + 1);
      searchQuestionAndChange(head + '.' + tail, condition);
      searchQuestionAndChange(head + '#' + tail, condition);
    }

    searchQuestionAndChange(spring[0], spring[1]);
    totalCount+=count;
  }

  return totalCount;
}

console.log(`Day 12 part 01 result is: ${dayTwelvePart1()}`);