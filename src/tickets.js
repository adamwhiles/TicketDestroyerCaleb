import { detectCollision } from "/src/collisionDetection";

export default class Ticket {
  constructor(game, position) {
    this.image = document.getElementById("img_ticket");

    this.game = game;

    this.position = position;
    this.width = 50;
    this.height = 25;

    this.markedForDeletion = false;
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.game.score++;
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
