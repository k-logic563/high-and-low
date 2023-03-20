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
  it ('HIGH & 数値比較：プレイヤーが勝つ', () => {
    const player = {
      suit: '♥',
      num: 13
    }
    const enemy = {
      suit: '♥',
      num: 1
    }
    expect(actionBattle(player, enemy, 'high')).toBe('player')
  })
  it ('HIGH & 数値比較：相手が勝つ', () => {
    const player = {
      suit: '♥',
      num: 1
    }
    const enemy = {
      suit: '♥',
      num: 13
    }
    expect(actionBattle(player, enemy, 'high')).toBe('enemy')
  })
  it ('HIGH & 絵柄比較：プレイヤーが勝つ', () => {
    const player = {
      suit: '♠',
      num: 1
    }
    const enemy = {
      suit: '♥',
      num: 1
    }
    expect(actionBattle(player, enemy, 'high')).toBe('player')
  })
  it ('HIGH & 絵柄比較：敵が勝つ', () => {
    const player = {
      suit: '♥',
      num: 1
    }
    const enemy = {
      suit: '♠',
      num: 1
    }
    expect(actionBattle(player, enemy, 'high')).toBe('enemy')
  })

  it ('LOW & 数値比較：プレイヤーが勝つ', () => {
    const player = {
      suit: '♥',
      num: 1
    }
    const enemy = {
      suit: '♥',
      num: 13
    }
    expect(actionBattle(player, enemy, 'low')).toBe('player')
  })
  it ('LOW & 数値比較：相手が勝つ', () => {
    const player = {
      suit: '♥',
      num: 13
    }
    const enemy = {
      suit: '♥',
      num: 1
    }
    expect(actionBattle(player, enemy, 'low')).toBe('enemy')
  })
  it ('LOW & 絵柄比較：プレイヤーが勝つ', () => {
    const player = {
      suit: '♥',
      num: 1
    }
    const enemy = {
      suit: '♠',
      num: 1
    }
    expect(actionBattle(player, enemy, 'low')).toBe('player')
  })
  it ('LOW & 絵柄比較：敵が勝つ', () => {
    const player = {
      suit: '♠',
      num: 1
    }
    const enemy = {
      suit: '♥',
      num: 1
    }
    expect(actionBattle(player, enemy, 'low')).toBe('enemy')
  })
})