const Card = require('@/js/modules/card')
const utils = require('@/js/utils')
const { suits } = require('@/constants')

const trampDoms = document.querySelectorAll('.js-tramp')
const winArea = document.getElementById('js-win')
const loseArea = document.getElementById('js-lose')
const percentArea = document.getElementById('js-percent')
const countArea = document.getElementById('js-count')
const turnArea = document.getElementById('js-turn')
const trashArea = document.getElementById('js-trashArea')

class Action {
  setTramp() {
    for (let i = 0; i < suits.length; i++) {
      for (let j = 1; j <= 13; j++) {
        const tramp = new Card(suits[i], j)
        this.tramps.push(tramp)
      }
    }
    this.tramps = utils.shuffle(this.tramps)
  }
  
  resetGame() {
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
        if (!this.tramps.length || this.flag) return

        this.flag = true

        const target = e.currentTarget
        const allyTramp = this[target.dataset.key]
        const enemyTramp = this[target.dataset.key === 'first' ? 'second' : 'first']
        this.renderTramp(true)
        await utils.sleep(500)

        // 勝者を決める
        let victory = {}
        const winner = utils.actionBattle(allyTramp, enemyTramp)
        if (winner === 'ally') {
          victory = allyTramp
          this.winCount++
        } else {
          victory = enemyTramp
          this.loseCount++
        }

        // このターンの勝敗をアラートで表示する
        alert(`${enemyTramp.suit}${utils.convertTrampPattern(enemyTramp.num)} vs ${allyTramp.suit}${utils.convertTrampPattern(allyTramp.num)} :selected\n${victory.suit}${utils.convertTrampPattern(victory.num)} :victory`)

        this.flag = false

        this.nextGame()
      })
    })
  }

  async nextGame() {
    // 出ているトランプを破棄する
    this.tramps.splice(0, 2)
    // 破棄したトランプをセットする
    this.trashTramps.push(this.first)
    this.trashTramps.push(this.second)
    // トランプがあればターンを増やす
    if (this.tramps.length) {
      this.turn++
    }
    // スコアを更新する
    this.displayScore()
    // 捨て場を更新する
    this.renderTrashTramp()
    // トランプ残数がない時
    if (!this.tramps.length) {
      await utils.sleep(500)
      // ランクをアラート表示させる
      alert(utils.checkRank(this.winPercent))
      // ボタンテキスト変更
      resetBtn.innerText = 'もう一度あそぶ'
      return
    }
    // 新たにトランプをセットする
    this.renderTramp()
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

module.exports = Action