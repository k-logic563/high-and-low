const suits = ['♥', '♦', '♣', '♠']
const trampDoms = document.querySelectorAll('.js-tramp')
const resetBtn = document.getElementById('js-resetBtn')
const winArea = document.getElementById('js-win')
const loseArea = document.getElementById('js-lose')
const percentArea = document.getElementById('js-percent')
const countArea = document.getElementById('js-count')
const turnArea = document.getElementById('js-turn')
const trashArea = document.getElementById('js-trashArea')

// 各トランプクラス
class Card {
  constructor(suit, num) {
    this.suit = suit
    this.num = num
  }
}

class Game {
  tramps = []
  trashTramps = []
  first = {}
  second = {}
  turn = 1
  winCount = 0
  loseCount = 0
  flag = false

  init() {
    this.setTramp()
    this.renderTramp()
    this.displayScore()
    this.battle()
  }

  setTramp() {
    for (let i = 0; i < suits.length; i++) {
      for (let j = 1; j <= 13; j++) {
        const tramp = new Card(suits[i], j)
        this.tramps.push(tramp)
      }
    }
    this.tramps = shuffle(this.tramps)
  }

  reset() {
    resetBtn.innerText = 'リセット'

    this.tramps.length = 0
    this.trashTramps.length = 0
    this.turn = 1
    this.winCount = 0
    this.loseCount = 0
    this.winPercent = 0

    this.setTramp()
    this.displayScore()
    this.renderTrashTramp()
    this.renderTramp()
  }

  battle() {
    trampDoms.forEach(tramp => {
      tramp.addEventListener('click', async (e) => {
        // トランプがない、またはクリックフラグがあるときは処理しない
        if (!this.tramps.length || this.flag) return

        this.flag = true

        let winner = {}
        const target = e.currentTarget
        const selectTramp = this[target.dataset.key]
        const vsTramp = this[target.dataset.key === 'first' ? 'second' : 'first']

        // ターンを増やす
        this.turn++
        // 2枚目を表示する
        this.renderTramp(true)
        // 0.5秒停止
        await sleep(500)
  
        // 同数ならば絵柄の勝負
        // (弱)クローバー < ダイヤ < ハート < スペード(強)
        if (selectTramp.num === vsTramp.num) {
          const selectPatternIndex = suits.findIndex(s => s === selectTramp.suit)
          const vsPatternIndex = suits.findIndex(s => s === vsTramp.suit)
          if (selectPatternIndex > vsPatternIndex) {
            this.winCount++
            winner = selectTramp
          } else {
            this.loseCount++
            winner = vsTramp
          }
        } else {
          // 数値の勝負
          // (弱)2 < 3 < 4 .... J < Q < K < A(強)
          if (selectTramp.num === 1) {
            this.winCount++
            winner = selectTramp
          } else if (vsTramp.num === 1) {
            this.loseCount++
            winner = vsTramp
          } else if (selectTramp.num > vsTramp.num) {
            this.winCount++
            winner = selectTramp
          } else {
            this.loseCount++
            winner = vsTramp
          }
        }
  
        // このターンの勝敗をアラートで表示する
        alert(`${vsTramp.suit}${convertTrampPattern(vsTramp.num)} vs ${selectTramp.suit}${convertTrampPattern(selectTramp.num)} :selected ${winner.suit}${convertTrampPattern(winner.num)} :victory`)

        this.flag = false
  
        // 出ているトランプを破棄する
        this.tramps.splice(0, 2)
        // 破棄したトランプをセットする
        this.trashTramps.push(this.first)
        this.trashTramps.push(this.second)
        // スコアを更新する
        this.displayScore()
        // 捨て場を更新する
        this.renderTrashTramp()
        // トランプが0になればランクをアラート表示させる
        // ボタンの文言を変更
        if (!this.tramps.length) {
          await sleep(500)

          alert(checkRank(this.winPercent))
          resetBtn.innerText = 'もう一度あそぶ'
          return
        }
        // 新たにトランプをセットする
        this.renderTramp()
      })
    })
  }

  displayScore() {
    turnArea.innerText = this.turn
    countArea.innerText = this.tramps.length
    winArea.innerText = this.winCount
    loseArea.innerText = this.loseCount
    // 初回ターンは0表示のみの処理
    if (this.turn === 1) {
      percentArea.innerText = '0'
      return
    }

    let result = 0
    const percent = this.winCount / (this.winCount + this.loseCount)
    const splitPercent = String(percent).split('.')
    // 少数第二があった場合は切り上げ
    if (splitPercent[1] && splitPercent[1].length >= 2) {
      result = Math.round(((this.winCount / (this.winCount + this.loseCount)) * 100) * 10) / 10
      percentArea.innerText = result
    } else {
      result = percent * 100
      percentArea.innerText = result
    }
    this.winPercent = result
  }

  renderTrashTramp() {
    if (!this.trashTramps.length) {
      trashArea.innerHTML = ''
      return
    }
    trashArea.innerHTML = this.trashTramps
      .map(tramp => `<img src="images/${tramp.suit}-${tramp.num}.png">`)
      .join('')
  }

  renderTramp(isBattle = false) {
    const first = this.tramps[0]
    const second = this.tramps[1]
    this.first = first
    this.second = second
    if (isBattle) {
      trampDoms[1].innerHTML = `<img src="images/${second.suit}-${second.num}.png">`
      return
    }
    trampDoms[0].innerHTML = `<img src="images/${first.suit}-${first.num}.png">`
    trampDoms[1].innerHTML = '<img src="images/back.png">'
  }
}

const game = new Game()
// ゲーム開始
game.init()
// リセットボタン
resetBtn.addEventListener('click', () => {
  game.reset()
})