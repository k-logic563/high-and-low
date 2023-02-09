const Action = require('@/js/modules/action')

class Game extends Action {
  tramps = []
  trashTramps = []
  first = {}
  second = {}
  turn = 1
  winCount = 0
  loseCount = 0
  flag = false

  init() {
    const resetBtn = document.getElementById('js-resetBtn')
    resetBtn.addEventListener('click', () => {
      resetBtn.innerText = 'リセット'
      this.resetGame() 
    })
    this.setTramp()
    this.renderTramp()
    this.displayScore()
    this.battle()
  }
}

const game = new Game()
game.init()