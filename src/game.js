import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import { buildLevel, level1, level2, level3, level4 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.lives = 3;
    this.score = 0;

    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameObjects = [];
    this.tickets = [];

    this.levels = [level1, level2, level3, level4];
    this.currentLevel = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;

    this.tickets = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];
    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltatime) {
    document.getElementById("currentScore").textContent = this.score;
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    if (this.tickets.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.tickets].forEach(object =>
      object.update(deltatime)
    );
    this.tickets = this.tickets.filter(ticket => !ticket.markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.tickets].forEach(object => object.draw(ctx));
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press Space Bar To Play",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
      ctx.font = "16px Arial";
      ctx.fillText(
        "Use the left and right arrow keys to move.",
        this.gameWidth / 2,
        this.gameHeight / 2 + 50
      );
      ctx.fillText(
        "Press ESC to pause the game.",
        this.gameWidth / 2,
        this.gameHeight / 2 + 70
      );
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER!!", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.currentLevel >= 5) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("YOU WIN!!", this.gameWidth / 2, this.gameHeight / 2);
      ctx.font = "16px Arial";
      ctx.fillText(
        "Final Score: " + this.score,
        this.gameWidth / 2,
        this.gameHeight / 2 + 50
      );
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
