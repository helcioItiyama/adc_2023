const getInput = require("../util");

const dayTwoPart1 =  () => { 
  const textByLine = getInput("input_day2"); 
  let totalPossibleGames = 0;
  const rules = {red: 12, green: 13, blue: 14}

  for (let i = 0; i < textByLine.length; i++) {
    const splitLine = textByLine[i].split(":");
    const id = Number(splitLine[0].split(" ")[1]);
    const subsets = splitLine[1].split(/[;,]/g);

    const isPossible = subsets.every(each => {
      const [number, color] = each.trim().split(" ");
      return rules[color] >= Number(number);
    })
  
    if(isPossible) {
      totalPossibleGames += id
    }
  }

  return totalPossibleGames;
}

console.log(`Day 02 part 01 result is: ${dayTwoPart1()}`)

const dayTwoPart2 = () => {
  const textByLine = getInput("input_day2"); 

  const gamesWithMinimum = textByLine.map(line => {
      const splitLine = line.split(":");
      const subsets = splitLine[1].split(";");

      const minimumPossible = subsets.reduce((total, set) => {
        const colorObj = set.split(",").reduce((acc, each) => {
          const [number, color] = each.trim().split(" ");
          acc[color] = Number(number);
          return acc;
        }, {});
        
        for (const color in colorObj) {
          if(total[color] < colorObj[color]) {
            total[color] = colorObj[color];
          }
        }
        
        return total;     
      }, {red: 0, blue: 0, green: 0});

      return minimumPossible
    })

  const totalSumOfPower = gamesWithMinimum.reduce((total, each) => {
    return total + each.red * each.blue * each.green;
  }, 0)

  return totalSumOfPower;
}

console.log(`Day 02 part 02 result is: ${dayTwoPart2()}`)
