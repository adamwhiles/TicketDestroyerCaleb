export function detectCollision(ball, gameObject) {
  let ballRight = ball.position.x + ball.size;
  let ballBottom = ball.position.y + ball.size;

  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (
    ballRight > gameObject.position.x &&
    rightSideOfObject > ball.position.x &&
    ballBottom > gameObject.position.y &&
    bottomOfObject > ball.position.y
  ) {
    return true;
  } else {
    return false;
  }
}
