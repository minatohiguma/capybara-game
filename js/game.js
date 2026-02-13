// game.js

// ===============================
// ステージ判定
// ===============================

const params = new URLSearchParams(location.search);
const stageNumber = Number(params.get("stage")) || 1;

console.log("現在のステージ:", stageNumber);

window.stageSettings = {
  speedMultiplier: 1,
  spawnRate: 1
};

const stageConfig = {
  1: { speedMultiplier: 1, spawnRate: 1 },
  2: { speedMultiplier: 1.5, spawnRate: 1.3 }
};

window.stageSettings = stageConfig[stageNumber] || stageConfig[1];

const title = document.getElementById("stageTitle");
title.textContent = "🦫 Stage " + stageNumber + " 🦫";

const startBtn = document.getElementById("startBtn");
const countdownText = document.getElementById("countdown");
const scoreText = document.getElementById("score");


// デバッグ用（宣言のあとならOK）
console.log("startBtn:", startBtn);



window.score = 0;
let gameInterval;
let countdown = 3;

/* ===== スタートボタン ===== */
startBtn.addEventListener("click", () => {

  countdown = 3; // ★毎回リセット

  startBtn.style.display = "none";
  countdownText.style.display = "block";
  countdownText.textContent = countdown;

  const timer = setInterval(() => {
    countdown--;
    countdownText.textContent = countdown;

    if (countdown <= 0) {
      clearInterval(timer);
      countdownText.style.display = "none";
      startGame();
    }
  }, 1000);
});

/* ===== ゲーム開始 ===== */
function startGame() {

  window.score = 0;
  scoreText.textContent = window.score;


  gameInterval = setInterval(() => {

    updatePlayer();

    let left = obstacle.offsetLeft;
    obstacle.style.left =
    left - currentType.speed * window.stageSettings.speedMultiplier + "px";


    if (left < -60) {
      resetObstacle();
      window.score++;
      scoreText.textContent = window.score;

      if (Math.random() < 0.3 && !itemActive) {
        spawnItem();
      }
    }

    moveItem();

    if (isHit()) {
      clearInterval(gameInterval); // ★ループ停止
      alert("ゲームオーバー！ スコア：" + window.score);
      location.href = "index.html";
    }

  }, 20);
}

/* ===== 当たり判定 ===== */
function isHit() {
  const p = player.getBoundingClientRect();
  const o = obstacle.getBoundingClientRect();
  const margin = 15;

  return (
    p.right - margin > o.left + margin &&
    p.left + margin < o.right - margin &&
    p.bottom - margin > o.top + margin &&
    p.top + margin < o.bottom - margin
  );
}
