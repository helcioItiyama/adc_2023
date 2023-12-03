const getInput = require("../util");

const dayThreePart1 =  () => { 
  const lineArray = getInput("input_day3"); 

  let totalOfPartNumbers = 0;

  const isASymbol = (l, r) => {
    return !lineArray[l][r].match(/[0-9 .]/g)
  };

  const checkTop = (l, r, lastRow) => {
    if(l < 0) return false;

    const left = checkLeft(l, r - 1);
    const middle = isASymbol(l, r);
    const right = checkRight(l, r + 1, lastRow);

    return left || middle || right;
  }

  const checkBottom = (l, r, lastRow, lastLine) => {
    if(l >= lastLine) return false;

    const left = checkLeft(l, r - 1);
    const middle = isASymbol(l, r);
    const right = checkRight(l, r + 1, lastRow);

    return left || middle || right;
  }

  const checkLeft = (l, r) => {
    if(r < 0) return false;
    return isASymbol(l, r);
  }

  const checkRight = (l, r, lastRow) => {
    if(r >= lastRow) return false;
    return isASymbol(l, r);
  }

  const checkIfIsPartNumber = (l, r, lastRow, lastLine) => {
      const top = checkTop(l - 1, r, lastRow);
      const bottom = checkBottom(l + 1, r, lastRow, lastLine);
      const left = checkLeft(l, r - 1);
      const right = checkRight(l, r + 1, lastRow);
      return top || bottom || left || right;
  }
  
  for (let l = 0;  l < lineArray.length; l++) {
    let chunkOfNumber = "";
    let isPartNumber = false;
    const lastRow = lineArray[l].length;
    const lastLine = lineArray.length;

    for (let r = 0; r < lastRow; r++) {
      if(lineArray[l][r]?.match(/[0-9]/g)) {
        chunkOfNumber += lineArray[l][r];
   
        if(checkIfIsPartNumber(l, r, lastRow, lastLine)) {
          isPartNumber = true;
        }
     
        if(r + 1 === lastRow) {
          if(chunkOfNumber && isPartNumber) {
            totalOfPartNumbers += Number(chunkOfNumber)
          }
          chunkOfNumber = "";
          isPartNumber = false;
        }
      } else {
        if(chunkOfNumber && isPartNumber) {
          totalOfPartNumbers += Number(chunkOfNumber)
        }
        chunkOfNumber = "";
        isPartNumber = false;
      }
    }
  }

  return totalOfPartNumbers;
}

console.log(`Day 03 part 01 result is: ${dayThreePart1()}`)


const dayThreePart2 = () => { 
  const lineArray = getInput("input_day3"); 

  const listOfPartOfNumbers = [];

  const isDigit = (l, r) => lineArray[l][r].match(/[0-9]/g);

  const checkTop = (l, r, lastRow) => {
    if(l < 0) return "";

    const left = checkLeft(l, r - 1);
    const middle = isDigit(l, r) ? lineArray[l][r] : "";
    const right = checkRight(l, r + 1, lastRow);

    if(middle) {
      return left + lineArray[l][r] + right;
    }

    return (left && right) ? `${left}_${right}` : left + right;
  }

  const checkBottom = (l, r, lastRow, lastLine) => {
    if(l >= lastLine) return "";

    const left = checkLeft(l, r - 1);
    const middle = isDigit(l, r) ? lineArray[l][r] : "";
    const right = checkRight(l, r + 1, lastRow);

    if(middle) {
      return left + lineArray[l][r] + right;
    }

    return (left && right) ? `${left}_${right}` : left + right;
  }

  const checkLeft = (l, r) => {
    if(!isDigit(l, r)) return "";
    const leftIndex = r -1;
    let leftString = ""

    if(leftIndex >= 0 && isDigit(l, leftIndex)) {
      leftString = checkLeft(l, leftIndex);
    }
    return leftString + lineArray[l][r];
  }

  const checkRight = (l, r, lastRow) => {
    if(r >= lastRow || !isDigit(l, r)) return "";
    const rightIndex = r + 1;
    let rightString = "";

    if(lastRow > rightIndex && isDigit(l, rightIndex)) {
      rightString = checkRight(l, rightIndex, lastRow);
    }

    return lineArray[l][r] + rightString;
  }
  
  for (let l = 0;  l < lineArray.length; l++) {
    const lastRow = lineArray[l].length;
    const lastLine = lineArray.length;

    for (let r = 0; r < lastRow; r++) {
      const list = [];

      if(lineArray[l][r] == "*") {
        const left = checkLeft(l, r - 1);
        const right = checkRight(l, r + 1, lastRow);
        const top = checkTop(l - 1, r, lastRow);
        const bottom = checkBottom(l + 1, r, lastRow, lastLine);

        if(left) list.push(Number(left));
        if(right) list.push(Number(right));
        if(top) {
          if(top.includes("_")) {
            const doubles = top.split("_");
            for (const each of doubles) {
              list.push(Number(each));
            }
          } else {
            list.push(Number(top));
          }
        };
        if(bottom) {
          if(bottom.includes("_")) {
            const doubles = bottom.split("_");
            for (const each of doubles) {
              list.push(Number(each));
            }
          } else {
            list.push(Number(bottom));
          }
        };
      }

      if(list.length > 1) {
        listOfPartOfNumbers.push(list.reduce((acc, each) => acc * each, 1))
      }

    }
  }
  return listOfPartOfNumbers.reduce((acc, each) => acc + each, 0);
}

console.log(`Day 03 part 02 result is: ${dayThreePart2()}`)