const { suits } = require("@/constants");

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const convertTrampPattern = (j) => {
  let pattern;
  switch (j) {
    case 1:
      pattern = "A";
      break;
    case 11:
      pattern = "J";
      break;
    case 12:
      pattern = "Q";
      break;
    case 13:
      pattern = "K";
      break;
    default:
      pattern = j;
  }
  return pattern;
};

const checkRank = (percent) => {
  if (percent === 100) {
    return "完璧！";
  }
  if (percent >= 60) {
    return "すごいね！";
  }
  if (percent >= 40) {
    return "まずまずだね！";
  }
  return "頑張ろう！";
};

const actionBattle = (ally, enemy) => {
  let winner = {};

  // 絵柄の勝負
  if (ally.num === enemy.num) {
    const selectPatternIndex = suits.findIndex((s) => s === ally.suit);
    const vsPatternIndex = suits.findIndex((s) => s === enemy.suit);
    if (selectPatternIndex > vsPatternIndex) {
      winner = "ally";
    } else {
      winner = "enemy";
    }
  } else {
    // 数値の勝負
    // (弱)2 < 3 < 4 .... J < Q < K < A(強)
    if (ally.num === 1) {
      winner = "ally";
    } else if (enemy.num === 1) {
      winner = "enemy";
    } else if (ally.num > enemy.num) {
      winner = "ally";
    } else {
      winner = "enemy";
    }
  }

  return winner;
};

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  sleep,
  checkRank,
  actionBattle,
  convertTrampPattern,
  shuffle,
};
