const getInput = require("../util");

const RULES = {
  HIGH_CARD: 0,
  ONE_PAIR: 1,
  TWO_PAIR: 2,
  THREE_OF_A_KIND: 3,
  FULL_HOUSE: 4,
  FOUR_OF_A_KIND: 5,
  FIVE_OF_A_KIND: 6,
};

const cardsLabel = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const cardsLabelWithJoker = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

const getTotalPoints = sortedByCards => {
  let rank = 1;

  return sortedByCards.reduce((t, e) => {
    if(e.length >= 1) {
      e.forEach(i => {
        t += Number(i.point) * rank;
        rank += 1;
      })
    }
  return t;
  }, 0)
}

const getGame = input => input.reduce((acc, curr) => {
  const [hand, point] = curr.split(' ');
  acc.push({hand, point});
  return acc;
}, []);

const pushRules = (type, hand, position) => type[position].push(hand);

const getTypes = (label, string) => {
  const repeats = []
  for (let i = 0; i < label.length; i++) {
    const getTimes = string.match(new RegExp(label[i], "g"))?.length ?? 0;
    if(getTimes > 0) {
      repeats.push(getTimes)
    }
  }
  return repeats;
}

const getSortedTypeArrays = (types, label) => types.map(type => {
    return type.length ?
    type.sort((a, b) => {
      for(let i = 0; i < a.hand.length; i++) {
        if(label.indexOf(b.hand[i]) === label.indexOf(a.hand[i])) continue
        return label.indexOf(b.hand[i]) - label.indexOf(a.hand[i])
      }
    }) : type;
  });

class Rules {
  #game = [];

  constructor(game) {
    this.#game = game;
  }

  isHighCard () {
    return this.#game.every(n => n === 1);
  }

  isOnePair () {
    return this.#game.filter(n => n === 1)?.length > 1 && this.#game.includes(2);
  }

  isTwoPair() {
    return this.#game.filter(n => n === 2)?.length >= 2;
  }

  isThreeOfAKind() {
    return this.#game.includes(3) && this.#game.includes(1);
  }

  isFullHouse() {
    return this.#game.includes(3) && this.#game.includes(2);
  }

  isFourOfAKind() {
    return this.#game.includes(4);
  } 

  isFiveOfAKind() {
    return this.#game.includes(5)
  }
};

const getSortedGameByCards = game => {
  const typesArr = Array.from({length: 7}, () => []);

  for(let e = 0; e < game.length; e++) {
    const keyArr = getTypes(cardsLabel, game[e].hand);
    const pushLabelRules = label => pushRules(typesArr, game[e], label);
    const rules = new Rules(keyArr);

    switch (true) {
      case rules.isHighCard():
        pushLabelRules(RULES.HIGH_CARD);
        break;
      case rules.isOnePair():
        pushLabelRules(RULES.ONE_PAIR);
        break;
      case rules.isTwoPair():
        pushLabelRules(RULES.TWO_PAIR);
        break;
      case rules.isThreeOfAKind():
        pushLabelRules(RULES.THREE_OF_A_KIND);
        break;
      case rules.isFullHouse():
        pushLabelRules(RULES.FULL_HOUSE);
        break;
      case rules.isFourOfAKind():
        pushLabelRules(RULES.FOUR_OF_A_KIND);
        break;
      case rules.isFiveOfAKind():
        pushLabelRules(RULES.FIVE_OF_A_KIND);
        break;
      default:
        break;
    }
  }

  return getSortedTypeArrays(typesArr, cardsLabel);
};

const daySevenPart1 = () => { 
  const input = getInput("input_day7");
  const game = getGame(input);
  const sortedByCards = getSortedGameByCards(game);
  return getTotalPoints(sortedByCards);
};

console.log(`Day 07 part 01 result is: ${daySevenPart1()}`);

const getSortedGameByCardsIncludingJoker = game => {
  const typesArr = Array.from({length: 7}, () => []);

  for(let e = 0; e < game.length; e++) {
    const keyArr = getTypes(cardsLabelWithJoker, game[e].hand);
    const rules = new Rules(keyArr)
    const pushLabelRules = label => pushRules(typesArr, game[e], label);
    const jokers = game[e].hand.split('').filter(s => s === 'J')?.length ?? 0;
    const hasAJoker = jokers > 0;

    switch (true) {
      case rules.isHighCard():
        if(hasAJoker) {
          pushLabelRules(RULES.ONE_PAIR);
        } else {
          pushLabelRules(RULES.HIGH_CARD);
        }
        break;
      case rules.isOnePair():
        if(hasAJoker) {
          pushLabelRules(RULES.THREE_OF_A_KIND);
        } else {
          pushLabelRules(RULES.ONE_PAIR);
        }
        break;
      case rules.isTwoPair():
        if(hasAJoker && jokers < 2) {
          pushLabelRules(RULES.FULL_HOUSE);
        } else if (jokers === 2) {
          pushLabelRules(RULES.FOUR_OF_A_KIND);
        } else {
          pushLabelRules(RULES.TWO_PAIR);
        }
        break;
      case rules.isThreeOfAKind():
        if(hasAJoker) {
          pushLabelRules(RULES.FOUR_OF_A_KIND);
        } else {
          pushLabelRules(RULES.THREE_OF_A_KIND);
        }
        break;
      case rules.isFullHouse():
        if(hasAJoker) {
          pushLabelRules(RULES.FIVE_OF_A_KIND);
        } else {
          pushLabelRules(RULES.FULL_HOUSE);
        }
        break;
      case rules.isFourOfAKind():
        if(hasAJoker) {
          pushLabelRules(RULES.FIVE_OF_A_KIND);
        } else {
          pushLabelRules(RULES.FOUR_OF_A_KIND);
        }
        break;
      case rules.isFiveOfAKind():
        pushLabelRules(RULES.FIVE_OF_A_KIND);
        break;
      default:
        break;
    }
  }

  return getSortedTypeArrays(typesArr, cardsLabelWithJoker)
};

const daySevenPart2 = () => { 
  const input = getInput("input_day7");
  const game = getGame(input);
  const sortedByCards = getSortedGameByCardsIncludingJoker(game);
  return getTotalPoints(sortedByCards);
};

console.log(`Day 07 part 02 result is: ${daySevenPart2()}`);