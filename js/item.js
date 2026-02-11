const item = document.getElementById('item');

window.itemActive = false;
const ITEM_SPEED = 4;

window.spawnItem = function () {
  item.style.left = '900px';
  item.style.bottom = '40px';
  item.style.display = 'block';
  window.itemActive = true;
};

window.moveItem = function () {
  if (!window.itemActive) return;

  let left = item.offsetLeft;
  item.style.left = left - ITEM_SPEED + 'px';

  if (left < -50) {
    item.style.display = 'none';
    window.itemActive = false;
  }

  const playerLeft = window.playerX;
  const playerRight = window.playerX + 60;

  const itemLeft = item.offsetLeft;
  const itemRight = itemLeft + 40;

  if (
    itemLeft < playerRight &&
    itemRight > playerLeft &&
    window.position > 10
  ) {
    window.score += 5;
    window.scoreText.textContent = window.score;
    item.style.display = 'none';
    window.itemActive = false;
  }
};
