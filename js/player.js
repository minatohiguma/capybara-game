window.player = document.getElementById('player');
const player = window.player;

/* ===== ジャンプ ===== */
window.position = 0;
let isJumping = false;
window.isJumpKeyPressed = false;

const JUMP_MIN_HEIGHT = 80;
const JUMP_MAX_HEIGHT = 220;
const JUMP_UP_SPEED = 8;
const JUMP_DOWN_SPEED = 8;

/* ===== 横移動 ===== */
window.playerX = 50;
window.moveLeft = false;
window.moveRight = false;

const MOVE_SPEED = 4;
const GAME_WIDTH = 900;
const PLAYER_WIDTH = 60;

/* 初期位置 */
player.style.left = window.playerX + 'px';
player.style.bottom = window.position + 'px';

window.jump = function () {
  if (isJumping) return;
  isJumping = true;

  const up = setInterval(() => {
    if (
      (!window.isJumpKeyPressed && window.position >= JUMP_MIN_HEIGHT) ||
      window.position >= JUMP_MAX_HEIGHT
    ) {
      clearInterval(up);

      const down = setInterval(() => {
        if (window.position <= 0) {
          clearInterval(down);
          window.position = 0;
          isJumping = false;
        }
        window.position -= JUMP_DOWN_SPEED;
        player.style.bottom = window.position + 'px';
      }, 20);
    }

    window.position += JUMP_UP_SPEED;
    player.style.bottom = window.position + 'px';
  }, 20);
};

/* ===== 毎フレーム更新（横移動用） ===== */
const game = document.getElementById("game");

window.updatePlayer = function () {

  const GAME_WIDTH = game.clientWidth; // ★ここを動的取得にする

  if (window.moveLeft) {
    window.playerX -= MOVE_SPEED;
  }

  if (window.moveRight) {
    window.playerX += MOVE_SPEED;
  }

  // 画面外に出ない
  if (window.playerX < 0) window.playerX = 0;
  if (window.playerX > GAME_WIDTH - PLAYER_WIDTH) {
    window.playerX = GAME_WIDTH - PLAYER_WIDTH;
  }

  player.style.left = window.playerX + "px";
  console.log(window.moveLeft, window.moveRight);

};

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") window.moveLeft = true;
  if (e.code === "ArrowRight") window.moveRight = true;
  if (e.code === "Space") {
    window.isJumpKeyPressed = true;
    window.jump();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") window.moveLeft = false;
  if (e.code === "ArrowRight") window.moveRight = false;
  if (e.code === "Space") window.isJumpKeyPressed = false;
});
/* ===== キー操作 ===== */
document.addEventListener("keydown", (e) => {

  if (e.code === "ArrowLeft") {
    window.moveLeft = true;
  }

  if (e.code === "ArrowRight") {
    window.moveRight = true;
  }

  if (e.code === "Space") {
    window.isJumpKeyPressed = true;
    window.jump();
  }
});

document.addEventListener("keyup", (e) => {

  if (e.code === "ArrowLeft") {
    window.moveLeft = false;
  }

  if (e.code === "ArrowRight") {
    window.moveRight = false;
  }

  if (e.code === "Space") {
    window.isJumpKeyPressed = false;
  }
});
