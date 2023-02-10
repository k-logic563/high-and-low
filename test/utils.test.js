const { checkRank, convertTrampPattern, actionBattle } = require('@/js/utils')

test('勝率に応じたランクが返ってくる', () => {
  expect('PERFECT').toBe(checkRank(100))
  expect('EXCELLENT').toBe(checkRank(60))
  expect('OK').toBe(checkRank(40))
  expect('NOOB').toBe(checkRank(20))
})

test('トランプ番号に応じた絵柄が返ってくる', () => {
  expect('A').toBe(convertTrampPattern(1))
  expect('J').toBe(convertTrampPattern(11))
  expect('Q').toBe(convertTrampPattern(12))
  expect('K').toBe(convertTrampPattern(13))
  expect(2).toBe(convertTrampPattern(2))
})

describe('勝敗が正しく判定される', () => {
  it ('数値比較：味方が勝つ', () => {
    const ally = {
      suit: '♥',
      num: 1
    }
    const enemy = {
      suit: '♥',
      num: 2
    }
    expect(actionBattle(ally, enemy)).toBe('ally')
  })
  it ('数値比較：敵が勝つ', () => {
    const ally = {
      suit: '♥',
      num: 2
    }
    const enemy = {
      suit: '♥',
      num: 1
    }
    expect(actionBattle(ally, enemy)).toBe('enemy')
  })
  it ('絵柄比較：味方が勝つ', () => {
    const ally = {
      suit: '♠',
      num: 2
    }
    const enemy = {
      suit: '♥',
      num: 2
    }
    expect(actionBattle(ally, enemy)).toBe('ally')
  })
  it ('絵柄比較：敵が勝つ', () => {
    const ally = {
      suit: '♥',
      num: 2
    }
    const enemy = {
      suit: '♠',
      num: 2
    }
    expect(actionBattle(ally, enemy)).toBe('enemy')
  })
})