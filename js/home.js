// home.js

const stageButtons = document.querySelectorAll(".stageBtn");

stageButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const stage = btn.dataset.stage;

    // ステージ番号をURLに渡してゲーム画面へ
    location.href = "game.html?stage=" + stage;
  });
});
