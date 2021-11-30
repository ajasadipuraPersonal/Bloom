kaboom({
    global:true,
    fullscreen: false,
    scale: 1,
    width: 1000,
    height: 600,
    debug: true,
    clearColor: [0, 0, 0, 1],
});

// Speed identifiers
const MOVE_SPEED = 200;
const JUMP_FORCE = 800;
const BIG_JUMP_FORCE = 2000;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
const FALL_DEATH = 400;
const ENEMY_SPEED = 20;

//Game logic
let isJumping = true;
loadSprite('ground', 'sprites/ground-dead.png');
loadSprite('bot', 'sprites/bot2.png');
loadSprite('enemy', 'xqkDjqT.png');


scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj');

  const maps = [
    [
      '                                      ',
      '                                      ',
      '                                      ',
      '======================================',
    ],
  ];

  const player = add([
    sprite('bot'), solid(),
    pos(200, 392),
    body(),
    origin('bot')
  ]);

  const levelCfg = {
    width: 64,
    height: 64,
    pos: vec2(0, 200),
    '=': [sprite('ground'), solid()],
  };

  const gameLevel = addLevel(maps[level], levelCfg);

  player.action(() => {
    if (player.pos.y >= 1000) {
      go('lose');
    }
  });

  gravity(2700);

  player.action(() => {
    if(player.grounded()) {
      isJumping = false;
    }
  });

  keyDown('space', () => {
    if (player.grounded()) {
      player.jump(CURRENT_JUMP_FORCE);
    }
  });

  /**
   * Enemy control
   */

  /**
  * Adding controls for audio 
  */
  let music = document.getElementById("music");
  document.getElementById("music").loop = true;
  function playAudio() {
    //music.play();
  }
  keyPress('right', () => {
    playAudio();
  })
});

scene('lose', () => {
  add([text("You Lose...")])
});

start("game", { level: 0});