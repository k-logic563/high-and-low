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
    return "PERFECT";
  }
  if (percent >= 60) {
    return "EXCELLENT";
  }
  if (percent >= 40) {
    return "OK";
  }
  return "NOOB";
};

const actionBattle = (player, enemy, key) => {
  let winner = "";
  let firstCondition = "";
  let secondCondition = "";
  let thirdCondition = "";
  let forthCondition = "";

  // 絵柄の勝負
  if (player.num === enemy.num) {
    const playerIndex = suits.findIndex((s) => s === player.suit);
    const enemyIndex = suits.findIndex((s) => s === enemy.suit);

    if (key === "high") {
      firstCondition = playerIndex > enemyIndex;
    } else {
      firstCondition = playerIndex < enemyIndex;
    }

    if (firstCondition) {
      winner = "player";
    } else {
      winner = "enemy";
    }
  } else {
    // 数値の勝負
    secondCondition = key === "high" ? player.num === 13 : player.num === 1;
    thirdCondition = key === "high" ? enemy.num === 13 : enemy.num === 1;
    forthCondition =
      key === "high" ? player.num > enemy.num : player.num < enemy.num;

    if (secondCondition) {
      winner = "player";
    } else if (thirdCondition) {
      winner = "enemy";
    } else if (forthCondition) {
      winner = "player";
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
