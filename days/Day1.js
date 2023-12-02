const getInput = require("../util");

const getFiles = () => { 
  var textByLine = getInput("input_day1")
  let totalNumbers = 0;
  const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

  for (const line of textByLine) {
    const numberArray = [];

    for (let i = 0; i < numbers.length; i++) {
      let index = 0;
      const regex = new RegExp(numbers[i], "g");
      let word = line.match(regex);
      if(word?.length > 1) {
        firstIndex = line.indexOf(word[0]);
        lastIndex = line.lastIndexOf(word[0]);
        numberArray.push({index: firstIndex, number: i + 1})
        numberArray.push({index: lastIndex, number: i + 1})
      } else if(word?.length === 1) {
        index = line.indexOf(word);
        numberArray.push({index: index, number: i + 1})
      }
    }

    for (let i = 0; i < line.length; i++) {
        if(line[i].match(/[0-9]/g)) {
          numberArray.push({index: i, number: line[i]});
        }
      }

    if(numberArray.length === 1) {
      totalNumbers += Number(`${numberArray[0].number}${numberArray[0].number}`);
    }

    if(numberArray.length > 1) {
      const sortedArray = numberArray.sort((a, b) => a.index - b.index);
      totalNumbers += Number(`${sortedArray[0].number}${sortedArray[numberArray.length - 1].number}`)
    }
  }
  return totalNumbers;
}

console.log(getFiles())