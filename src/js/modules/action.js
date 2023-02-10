const Card = require("@/js/modules/card");
const utils = require("@/js/utils");
const { suits } = require("@/constants");

const resetBtn = document.getElementById("js-resetBtn");
const trampDoms = document.querySelectorAll(".js-tramp");
const winArea = document.getElementById("js-win");
const loseArea = document.getElementById("js-lose");
const percentArea = document.getElementById("js-percent");
const countArea = document.getElementById("js-count");
const turnArea = document.getElementById("js-turn");
const trashArea = document.getElementById("js-trashArea");

class Action {
  setTramp() {
    for (let i = 0; i < suits.length; i++) {
      for (let j = 1; j <= 13; j++) {
        const tramp = new Card(suits[i], j);
        this.tramps.push(tramp);
      }
    }
    this.tramps = utils.shuffle(this.tramps);
    this.preloadTramp();
  }

  preloadTramp() {
    for (let i = 0; i < this.tramps.length; i++) {
      const t = this.tramps[i];
      const src = `images/${t.suit}-${t.num}.png`;
      const img = document.createElement("img");
      img.src = src;
      this.preloadTramps.push(img);
    }
  }

  setResetListener() {
    resetBtn.addEventListener("click", () => {
      resetBtn.innerText = "リセット";
      this.resetGame();
    });
  }

  resetGame() {
    this.tramps.length = 0;
    this.trashTramps.length = 0;
    this.preloadTramps.length = 0;
    this.turn = 1;
    this.winCount = 0;
    this.loseCount = 0;
    this.winPercent = 0;

    this.setTramp();
    this.displayScore();
    this.renderTrashTramp();
    this.renderTramp();
  }

  battle() {
    trampDoms.forEach((tramp) => {
      tramp.addEventListener("click", async (e) => {
        if (!this.tramps.length || this.flag) return;

        this.flag = true;

        const target = e.currentTarget;
        const allyTramp = this[target.dataset.key];
        const enemyTramp =
          this[target.dataset.key === "first" ? "second" : "first"];
        this.renderTramp(true);
        await utils.sleep(500);

        let judge = "";
        let victory = {};
        const winner = utils.actionBattle(allyTramp, enemyTramp);
        if (winner === "ally") {
          judge = "WINNER!!";
          victory = allyTramp;
          this.winCount++;
        } else {
          judge = "LOSER...";
          victory = enemyTramp;
          this.loseCount++;
        }
        // このターンの勝敗をアラートで表示する
        const resultText = `【YOU】${allyTramp.suit}${utils.convertTrampPattern(
          allyTramp.num
        )}\nvs\n【ENEMY】${enemyTramp.suit}${utils.convertTrampPattern(
          enemyTramp.num
        )}\n\nYOU ${judge}`;
        alert(resultText);

        this.flag = false;
        this.nextGame();
      });
    });
  }

  async nextGame() {
    // 出ているトランプを破棄する
    this.tramps.splice(0, 2);
    // 破棄したトランプをセットする
    const setTrashTramps = this.preloadTramps.slice(0, 2);
    this.trashTramps.push(setTrashTramps[0]);
    this.trashTramps.push(setTrashTramps[1]);
    this.preloadTramps.splice(0, 2);
    // トランプがあればターンを増やす
    if (this.tramps.length) {
      this.turn++;
    }
    // スコアを更新する
    this.displayScore();
    // 捨て場を更新する
    this.renderTrashTramp();
    // トランプ残数がない時
    if (!this.tramps.length) {
      await utils.sleep(500);
      // ランクをアラート表示させる
      alert(utils.checkRank(this.winPercent));
      // ボタンテキスト変更
      resetBtn.innerText = "もう一度あそぶ";
      return;
    }
    // 新たにトランプをセットする
    this.renderTramp();
  }

  displayScore() {
    turnArea.innerText = this.turn;
    countArea.innerText = this.tramps.length;
    winArea.innerText = this.winCount;
    loseArea.innerText = this.loseCount;
    // 初回ターンは0表示のみの処理
    if (this.turn === 1) {
      percentArea.innerText = "0";
      return;
    }

    let result = 0;
    const percent = this.winCount / (this.winCount + this.loseCount);
    const splitPercent = String(percent).split(".");
    // 少数第二があった場合は切り上げ
    if (splitPercent[1] && splitPercent[1].length >= 2) {
      result =
        Math.round(
          (this.winCount / (this.winCount + this.loseCount)) * 100 * 10
        ) / 10;
      percentArea.innerText = result;
    } else {
      result = percent * 100;
      percentArea.innerText = result;
    }
    this.winPercent = result;
  }

  renderTrashTramp() {
    if (!this.trashTramps.length) {
      trashArea.textContent = "";
      return;
    }
    trashArea.appendChild(this.trashTramps[this.trashTramps.length - 1]);
    trashArea.appendChild(this.trashTramps[this.trashTramps.length - 2]);
  }

  renderTramp(isBattle = false) {
    this.first = this.tramps[0];
    this.second = this.tramps[1];
    if (isBattle) {
      trampDoms[1].textContent = "";
      trampDoms[1].appendChild(this.preloadTramps[1]);
      return;
    }
    trampDoms[0].textContent = "";
    trampDoms[0].appendChild(this.preloadTramps[0]);
    trampDoms[1].innerHTML = '<img src="images/back.png">';
  }
}

module.exports = Action;
