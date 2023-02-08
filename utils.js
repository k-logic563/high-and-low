const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const convertTrampPattern = (j) => {
  let pattern
  switch (j) {
    case 1:
      pattern = 'A'
      break
    case 11:
      pattern = 'J'
      break
    case 12:
      pattern = 'Q'
      break
    case 13:
      pattern = 'K'
      break
    default:
      pattern = j
  }
  return pattern
}

const checkRank = (percent) => {
  if (percent === 100) {
    return 'PERFECT'
  }
  if (percent >= 60) {
    return 'EXCELLENT'
  }
  if (percent >= 40) {
    return 'OK'
  }
  return 'NOOB'
}

const sleep = async(ms) => new Promise(resolve => setTimeout(resolve, ms))