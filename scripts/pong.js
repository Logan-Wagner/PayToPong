class Pong {
  constructor(backgroundId) {
    this.canvas = document.getElementById(backgroundId);
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.leftPaddle = new Paddle(30, 250, 15, 50, 3);
    this.rightPaddle = new Paddle(970, 250, 15, 50, 3);
    this.ball = new Ball(500, 250, -5, 0, 5);
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = "white";
    this.leftScore = 0;
    this.rightScore = 0;
    this.isTwoPlayer = false;
    this.animationFrameId = -1;
    this.leftPaddleUp = false;
    this.leftPaddleDown = false;
    this.rightPaddleUp = false;
    this.rightPaddleDown = false;
  }


  setup() {
    console.log("setting up")
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.x = 500;
    this.ball.y = 250;
    this.drawPaddles();
    this.drawBall();
    this.drawCenterLine();

    window.addEventListener("keydown", (e) => processKeyDown(e, this));
    window.addEventListener("keyup", (e) => processKeyUp(e, this));
  }


  drawCenterLine() {
    this.context.beginPath();
    for (let i = 0; i < 34; i++) {
      let location = (this.canvas.width / 2) - 1;
      let top = 15 * i;
      this.context.rect(location, top, 2, 5);
    }
    this.context.fill();
  }

  drawPaddles() {
    this.context.beginPath();
    this.context.rect(this.leftPaddle.x - (this.leftPaddle.width / 2),  this.leftPaddle.y - (this.leftPaddle.height / 2), this.leftPaddle.width, this.leftPaddle.height);
    this.context.rect(this.rightPaddle.x - (this.rightPaddle.width / 2),  this.rightPaddle.y - (this.rightPaddle.height / 2), this.rightPaddle.width, this.rightPaddle.height);
    this.context.fill();
  }

  drawBall() {
    this.context.beginPath();
    this.context.arc(this.ball.x, this.ball.y, this.ball.radius, 0, 360)
    this.context.fill();
  }

  run() {
    // Determine if the left paddle needs to move
    if (this.leftPaddleUp) {
      this.leftPaddle.move("Up");
      let edges = this.leftPaddle.getEdges();
      if (edges.get("top") < 0) {
        this.leftPaddle.setTop(0);
      }
    }
    if (this.leftPaddleDown) {
      this.leftPaddle.move("Down");
      let edges = this.leftPaddle.getEdges();
      if (edges.get("bottom") > this.canvas.height) {
        this.leftPaddle.setBottom(this.canvas.height);
      }
    }

    // Move the ball
    this.ball.move();

    // Detect if the ball hit the top or bottom
    let edges = this.ball.getEdges();
    if (edges.get("top") < 0) {
      this.ball.setTop(0);
      this.ball.flipYSpeed();
    } else if (edges.get("bottom") > this.canvas.height) {
      this.ball.setBottom(this.canvas.height);
      this.ball.flipYSpeed();
    }

    // Detect if the ball hit a paddle
    if (edges.get("left") < 100) {
      let paddleEdges = this.leftPaddle.getEdges();
      if (edges.get("bottom") > paddleEdges.get("top") && edges.get("top") < paddleEdges.get("bottom")) {
        if (edges.get("left") <= paddleEdges.get("right")) {
          console.log(this.ball.xSpeed);
          this.ball.flipXSpeed();
          console.log(this.ball.xSpeed);
          this.ball.setYSpeed(computeYSpeed(this.ball.y, this.leftPaddle.height, paddleEdges.get("top")));
        }
      }
    } else if (edges.get("right") > this.canvas.width - 100) {
      let paddleEdges = this.rightPaddle.getEdges();
      if (edges.get("bottom") > paddleEdges.get("top") && edges.get("top") < paddleEdges.get("bottom")) {
        if (edges.get("right") >= paddleEdges.get("left")) {
          this.ball.flipXSpeed();
          this.ball.setYSpeed(-1 * computeYSpeed(this.ball.y, this.rightPaddle.height, paddleEdges.get("top")));
        }
      }
    }

    // Detect if someone scored
    if (this.ball.x < 0) {
      console.log("Right Scored");
      this.setup();
      return 0;
    }
    if (this.ball.x > this.canvas.width) {
      console.log("Left Scored");
      this.setup();
      return 0;
    }

    // Move the right paddle
    this.rightPaddle.setY(this.ball.y);
    let rEdges = this.rightPaddle.getEdges();
    if (rEdges.get("top") < 0) {
      this.rightPaddle.setTop(0);
    }
    if (rEdges.get("bottom") > this.canvas.height) {
      this.rightPaddle.setBottom(this.canvas.height);
    }


    // Redraw the screen
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBall();
    this.drawPaddles();
    this.drawCenterLine();

    // Request another animation frame
    this.animationFrameId = window.requestAnimationFrame(() => this.run());
  }

  setLeftUp() {
    this.leftPaddleUp = true;
    this.leftPaddleDown = false;
  }

  setLeftDown() {
    this.leftPaddleUp = false;
    this.leftPaddleDown = true;
  }

  leftKeyUp() {
    this.leftPaddleUp = false;
    this.leftPaddleDown = false;
  }

  start() {
    window.cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = window.requestAnimationFrame(() => this.run());

  }

  pause() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

}


function processKeyDown(e, game) {
  if (e.key == "w" || e.key == "W") {
    game.setLeftUp();
  }
  if (e.key == "s" || e.key == "S") {
    game.setLeftDown();
  }
}

function processKeyUp(e, game) {
  if (e.key =="w" || e.key == "W") {
    game.leftKeyUp();
  }
  if (e.key == "s" || e.key == "S") {
    game.leftKeyUp();
  }
}

function computeYSpeed(y, h, top) {
  if (y >= top + (h * (2/5)) && y <= top + (h * (3/5))) {
    return 0;
  }
  if ((y >= top + (h * (1/5)) && y < top + (h * (2/5))) ||
      (y > top + (h * (3/5)) && y <= top + (h * (4/5)))) {
    return 2;
  }
  if ((y >= top && y < top + (h * (1/5))) ||
      (y > top + (h * (4/5)) && y <= top + h)) {
    return 4;
  }
}
