const bot = document.getElementById("bot");
const rock = document.getElementById("rock");

function jump() {
  if (bot.classList != "jump") {
    bot.classList.add("jump");

    setTimeout(function () {
      bot.classList.remove("jump");
    }, 300);
  }
}

let isAlive = setInterval(function () {
  // get current bot Y position
  let botTop = parseInt(window.getComputedStyle(bot).getPropertyValue("top"));

  // get current rock X position
  let rockLeft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );

  // detect collision
  if (rockLeft < 50 && rockLeft > 0 && botTop >= 140) {
    // collision
    alert("Game Over!");
  }
}, 10);

document.addEventListener("keydown", function (event) {
  jump();
});