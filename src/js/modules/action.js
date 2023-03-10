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
      resetBtn.innerText = "ăȘă»ăă";
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
          judge = "ăăȘăăźćăĄă§ăïŒïŒ";
          victory = allyTramp;
          this.winCount++;
        } else {
          judge = "ăăȘăăźèČ ăă§ă...";
          victory = enemyTramp;
          this.loseCount++;
        }
        // ăăźăżăŒăłăźćæăăąă©ăŒăă§èĄšç€șăă
        const resultText = `${judge}\n\năăăȘăă${
          allyTramp.suit
        }${utils.convertTrampPattern(allyTramp.num)}\năçžæă${
          enemyTramp.suit
        }${utils.convertTrampPattern(enemyTramp.num)}`;
        alert(resultText);

        this.flag = false;
        this.nextGame();
      });
    });
  }

  async nextGame() {
    // ćșăŠăăăă©ăłăăç ŽæŁăă
    this.tramps.splice(0, 2);
    // ç ŽæŁăăăă©ăłăăă»ăăăă
    const setTrashTramps = this.preloadTramps.slice(0, 2);
    this.trashTramps.push(setTrashTramps[0]);
    this.trashTramps.push(setTrashTramps[1]);
    this.preloadTramps.splice(0, 2);
    // ăă©ăłăăăăă°ăżăŒăłăćąăă
    if (this.tramps.length) {
      this.turn++;
    }
    // ăčăłăąăæŽæ°ăă
    this.displayScore();
    // æšăŠć ŽăæŽæ°ăă
    this.renderTrashTramp();
    // ăă©ăłăæźæ°ăăȘăæ
    if (!this.tramps.length) {
      await utils.sleep(500);
      // ă©ăłăŻăăąă©ăŒăèĄšç€șăăă
      alert(utils.checkRank(this.winPercent));
      // ăăżăłăă­ăčăć€æŽ
      resetBtn.innerText = "ăăäžćșŠăăă¶";
      return;
    }
    // æ°ăă«ăă©ăłăăă»ăăăă
    this.renderTramp();
  }

  displayScore() {
    turnArea.innerText = this.turn;
    countArea.innerText = this.tramps.length;
    winArea.innerText = this.winCount;
    loseArea.innerText = this.loseCount;
    // ććăżăŒăłăŻ0èĄšç€șăźăżăźćŠç
    if (this.turn === 1) {
      percentArea.innerText = "0";
      return;
    }

    let result = 0;
    const percent = this.winCount / (this.winCount + this.loseCount);
    const splitPercent = String(percent).split(".");
    // ć°æ°çŹŹäșăăăŁăć ŽćăŻćăäžă
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
