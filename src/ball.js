import { detectCollision } from "/src/collisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");

    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;

    this.game = game;

    this.size = 50;

    this.reset();
  }

  reset() {
    this.speed = { x: 5, y: 5 };
    this.position = { x: 70, y: 200 };
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltatime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.game.score -= 10;
      this.reset();
    }

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
