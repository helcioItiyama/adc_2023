const getInput = require("../util");

const getWinningNumbers = input => {
  const separatedFromLabel = input.split(":")[1];
  const [cards, numbers] = separatedFromLabel.split("|").map((card) => 
    card.trim().split(" ").filter(number => number !== ""));
  return cards.filter(card => numbers.includes(card));
}

const dayFourPart1 =  () => { 
  const cardsArray = getInput("input_day4"); 
  let sumOfPoints = 0;

  for (let i = 0; i < cardsArray.length; i++) {
    const winningNumbers = getWinningNumbers(cardsArray[i])
    const points = winningNumbers.reduce((acc, _, index) => {
      if(index === 0) return acc + 1;
      return acc * 2
    }, 0);
    sumOfPoints += points;
  };

  return sumOfPoints;
}

console.log(`Day 04 part 01 result is: ${dayFourPart1()}`)

const dayFourPart2 =  () => { 
  const cardsArray = getInput("input_day4"); 
  const rules = cardsArray.map((_, index) => ({index, copy: 0, total: 1}))

  for (let i = 0; i < cardsArray.length; i++) {
    const winningNumbers = getWinningNumbers(cardsArray[i])?.length;
    for (let copy = winningNumbers; copy > 0; copy--) {
      const index = copy + i;
      if(rules.length > index) {
        rules[index].copy += rules[i].total;
        rules[index].total = rules[index].copy + 1;
      }
    }
  };

  return rules.reduce((acc, {total}) => acc + total, 0);
}

console.log(`Day 04 part 02 result is: ${dayFourPart2()}`)