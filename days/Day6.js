const getInput = require("../util");

const daySixPart1 = () => { 
  let total = null;
  const [time, length] = getInput("input_day6").join(':').split(':').filter(num => 
    num.match(/\d/g)).map(n => n.split(' ').filter(e => e !== '').map(e => Number(e))); 

  for(let i = 0; i < time.length; i++) {
    let beatRecord = 0;
    for(let t = 0; t <= time[i]; t++) {
      const hold = time[i] - t;
      const distance = hold * t;
      if(distance > length[i]) {
        beatRecord += 1;
      }
    }
    !total ? total = beatRecord : total *= beatRecord;
  }
  
  return total;
}

console.log(`Day 06 part 01 result is: ${daySixPart1()}`)

const daySixPart2 = () => { 
  let beatRecord = 0;
  const [time, length] = getInput("input_day6").join(':').split(':').filter(num => 
    num.match(/\d/g)).map(e => Number(e.split(' ').join('')))

  for(let t = 0; t <= time; t++) {
    const hold = time - t;
    const distance = hold * t;
    if(distance > length) {
      beatRecord += 1;
    }
  }
  
  return beatRecord;
}

console.log(`Day 06 part 02 result is: ${daySixPart2()}`)