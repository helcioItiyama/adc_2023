const getInput = require("../util");

const getNext = (arr, num) => {
  let destination = null;
  const seed = Number(num) ;
  for(let i = 0; i < arr.length; i++) {
    const min = Number(arr[i][1]);
    const max = Number(arr[i][1]) + Number(arr[i][2]) - 1;
    const dest = Number(arr[i][0]);
    if(seed >= min && seed <= max) {
        destination = seed - min + dest;
        break;
    }
  }
  return (destination ?? seed).toString();
}

const getCategories = (arr) => {
  let list = [];
  const categories = [];

  for (let i = 0; i < arr.length; i++) {
    if(arr[i] === "") {
      categories.push(list)
      list = [];
    } else {
      list.push(...arr[i].split(': ').filter(e => e.match(/\d/g)))
    }
    if(i === arr.length - 1) {
      categories.push(list)
    }
  }
  return categories;
}

const dayFivePart1 =  () => { 
  const locationMap = getInput("input_day5"); 
  let lowestLocation = Number.MAX_VALUE;
  const categories = getCategories(locationMap)
  const seeds = categories[0].map(data => data.split(' '))[0];

  const sections = categories.reduce((acc, section, i )=> {
    if(i > 0) {
      acc.push(section.map(data => data.split(' ')));
    } 
    return acc;
  }, [])

  for (const each of seeds) {
    let seed = each;
    for(let i = 0; i < sections.length; i++) {
      seed = getNext(sections[i], seed);
    }
    if(lowestLocation > Number(seed)) {
      lowestLocation = Number(seed);
    }
  }
  return lowestLocation
}

console.log(`Day 05 part 01 result is: ${dayFivePart1()}`)

