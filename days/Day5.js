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


const getNextRange = (arr, seedRange) => {
  const nextDestRange = [];
  const [sources, destinations] = arr.reduce((acc, each) => {
    const min = Number(each[1]);
    const max = Number(each[1]) + Number(each[2]) - 1;
    const dest = Number(each[0]);
    const maxDest = Number(each[0]) + Number(each[2]) - 1;
    acc[0].push([min, max]) 
    acc[1].push([dest, maxDest])
    return acc;
  },[[],[]])

  for(let i = 0; i < seedRange.length; i++) {
    const destRange = [];
    let minSeed = seedRange[i][0];
    let maxSeed = seedRange[i][1];

    for(let s = 0; s < sources.length; s++) {
      const min = sources[s][0];
      const max = sources[s][1];
      if(minSeed < min) {
        destRange.push([minSeed, min - 1])
      }

      if(minSeed >= min && maxSeed <= max) {
        const dest = minSeed - min + destinations[s][0];
        destRange.push([dest, destinations[s][1]])
        minSeed = maxSeed + 1;
        if(minSeed > maxSeed) break;
      }

      if(max >= minSeed && maxSeed > max) {
        const dest = minSeed - min + destinations[s][0];
        destRange.push([dest, destinations[s][1]])
        minSeed = max + 1;
        if(minSeed > maxSeed) break;
      }
    }

    if(minSeed > sources[sources.length - 1][1] && maxSeed > sources[sources.length - 1][1]) {
      destRange.push([minSeed, maxSeed])
    }

    if(minSeed <= sources[sources.length - 1][1] && maxSeed > sources[sources.length - 1][1]) {
      destRange.push([sources[sources.length - 1][1], maxSeed])
    }
    nextDestRange.push(...destRange)
  }

  return nextDestRange;
}

const dayFivePart2 =  () => { 
  const locationMap = getInput("input_day5"); 
  const categories = getCategories(locationMap)
  const seeds = categories[0].map(data => data.split(' '))[0];
  const lowestLocation = []
  let arr = [];

  const seedArray = seeds.reduce((t, e, i)=> {
    if(i%2 !== 0) {
      arr.push(e);
      t.push(arr);
      arr = []
    } else {
      arr.push(e);
    }
    return t;
  }, [])

  const sections = categories.reduce((acc, section, i )=> {
    if(i > 0) {
      acc.push(section.map(data => data.split(' ')));
    } 
    return acc;
  }, [])

  const sortedSections = sections.map(section => section.sort((a, b) => Number(a[1]) - Number(b[1])));

  for (const each of seedArray) {
      let seed = []
      seed.push(each.reduce((t, e , i)=> {
        if(i === 0) {
          t.push(Number(e));
        } else {
          t.push(t[i-1] + Number(e) - 1);
        }
        return t;
      }, []))

      for(let i = 0; i < sortedSections.length; i++) {
        seed = getNextRange(sortedSections[i], seed);
      }
      lowestLocation.push(...seed);
  }

  return lowestLocation.reduce( (t, e)=> {
    if(e[0] !== 0 && t > e[0]) {
      t = e[0];
    }
    return t;
  }, Number.MAX_VALUE);
}

console.log(`Day 05 part 02 result is: ${dayFivePart2()}`)