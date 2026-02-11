window.obstacle = document.getElementById('obstacle');
const obstacle = window.obstacle;

const obstacleTypes = [
  { width: 40, height: 40, speed: 6 },
  { width: 60, height: 60, speed: 7 }
];

window.currentType = obstacleTypes[0];

window.resetObstacle = function () {
  window.currentType =
    obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

  obstacle.style.width = currentType.width + 'px';
  obstacle.style.height = currentType.height + 'px';
  obstacle.style.left = '900px';
};

resetObstacle();
