const Action = require("@/js/modules/action");

class Game extends Action {
  tramps = [];
  trashTramps = [];
  preloadTramps = [];
  first = {};
  second = {};
  turn = 1;
  winCount = 0;
  loseCount = 0;
  flag = false;

  init() {
    this.setResetListener();
    this.setTramp();
    this.renderTramp();
    this.displayScore();
    this.battle();
  }
}

const game = new Game();
game.init();
