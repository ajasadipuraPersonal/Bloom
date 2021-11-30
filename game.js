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
const JUMP_FORCE = 700;
const BIG_JUMP_FORCE = 2000;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
const FALL_DEATH = 400;
const ENEMY_SPEED = 20;

//Game logic
loadSprite('ground', 'sprites/ground-dead.png');
loadSprite('bot', 'sprites/bot2.png');
loadSprite('enemy', 'sprites/enemy.jpeg');



scene("game", ({ levelId, score } = {levelId: 0, score: 0}) => {
  const MAPS = [
    [
      '                                      ',
      '                                      ',
      '                                      ',
      '======================================',
    ],
  ];
  
  const levelCfg = {
    width: 64,
    height: 64,
    pos: vec2(0, 200),
    '=': () => [sprite('ground'),
      area(),
      solid()],
  };

  layers(['bg', 'obj', 'ui'], 'obj');

  //addLevel(MAPS[levelId], levelCfg);
  const level = addLevel(MAPS[levelId ?? 0], levelCfg);


  const player = add([
    sprite('bot'),
    solid(),
    area(),
    pos(200, 392),
    body(),
    origin('bot')
  ]);

  player.action(() => {
    if (player.pos.y >= 1000) {
      go('lose');
    }
  });
  
  player.onCollide("enemy", (enemy) => {
    go('lose');
  });

  gravity(2000);

  keyDown('space', () => {
    if (player.grounded()) {
      player.jump(CURRENT_JUMP_FORCE);
    }
  });

  /**
   * Enemy control
   */

  function addObsticle() {
    const enemy = add([
      sprite('bot'),
      solid(),
      area(),
      pos(1100, 300),
      body(),
      scale(0.5),
      origin('center'),
      "enemy",
    ]);

    enemy.action(() => {
      enemy.move(-250, 0);
    });
  }

  wait(3, () => {
    loop(1.5, () => {
      addObsticle();
    }); 
  });

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

go("game");