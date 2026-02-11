// game.js

const startBtn = document.getElementById("startBtn");
const countdownText = document.getElementById("countdown");
const scoreText = document.getElementById("score");


// デバッグ用（宣言のあとならOK）
console.log("startBtn:", startBtn);

// URLからステージ番号を取得
const params = new URLSearchParams(location.search);
let currentStage = Number(params.get("stage")) || 1;

let score = 0;
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

  score = 0;
  scoreText.textContent = score;

  // ステージ別スピード設定
  if (currentStage === 2) {
    currentType.speed = 9;
  } else {
    currentType.speed = 6;
  }

  gameInterval = setInterval(() => {

    updatePlayer();

    let left = obstacle.offsetLeft;
    obstacle.style.left = left - currentType.speed + "px";

    if (left < -60) {
      resetObstacle();
      score++;
      scoreText.textContent = score;

      if (Math.random() < 0.3 && !itemActive) {
        spawnItem();
      }
    }

    moveItem();

    if (isHit()) {
      clearInterval(gameInterval); // ★ループ停止
      alert("ゲームオーバー！ スコア：" + score);
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
