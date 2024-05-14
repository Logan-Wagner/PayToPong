class Pong {
  constructor(backgroundId) {
    this.canvas = document.getElementById(backgroundId);
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.leftPaddle = new Paddle(30, 250, 15, 50, 5);
    this.rightPaddle = new Paddle(970, 250, 15, 50, 7);
    this.ball = new Ball(500, 250, 15, -10, 0);
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = "white";
    this.context.font = "100px serif"
    this.context.textAlign = "center";
    this.context.strokeStyle = "white";
    this.isTwoPlayer = false;
    this.leftScore = 0;
    this.rightScore = 0;
    this.animationFrameId = -1;
    this.leftPaddleUp = false;
    this.leftPaddleDown = false;
    this.rightPaddleUp = false;
    this.rightPaddleDown = false;
    this.betweenRounds = false;
    this.modifiers = {
      reverse: 0,
    }
  }


  setup() {
    document.getElementById("play-again").style.display = "none"
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawPaddles();
    this.drawScores();

    this.context.beginPath();
    this.context.moveTo(460, 192.3);
    this.context.lineTo(560, 250);
    this.context.lineTo(460, 307.7)
    this.context.closePath();
    this.context.fill();

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

  drawScores() {
    this.context.fillText(this.leftScore, 450, 75 , 50)
    this.context.fillText(this.rightScore, 550, 75 , 50)
  }

  drawPaddles() {
    this.context.beginPath();
    this.context.rect(this.leftPaddle.x - (this.leftPaddle.width / 2),  this.leftPaddle.y - (this.leftPaddle.height / 2), this.leftPaddle.width, this.leftPaddle.height);
    this.context.rect(this.rightPaddle.x - (this.rightPaddle.width / 2),  this.rightPaddle.y - (this.rightPaddle.height / 2), this.rightPaddle.width, this.rightPaddle.height);
    this.context.fill();
  }

  drawBall() {
    this.context.beginPath();
    this.context.rect(this.ball.x - (this.ball.dimension / 2), this.ball.y - (this.ball.dimension / 2), this.ball.dimension, this.ball.dimension)
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

    // Move the right paddle
    var rightPaddleEdges = this.rightPaddle.getEdges();
    if (this.ball.y > rightPaddleEdges.get("bottom")) { // ball is below the paddle
      if (this.modifiers.reverse > 0) {
        this.rightPaddle.move("Up")
      } else {
        this.rightPaddle.move("Down")
      }
    } else if (this.ball.y < rightPaddleEdges.get("top")){ // ball is above the paddle
      if (this.modifiers.reverse > 0) {
        this.rightPaddle.move("Down")
      } else {
        this.rightPaddle.move("Up")
      }
    }
    // Border collision detection
    if (rightPaddleEdges.get("top") < 0) {
      this.rightPaddle.setTop(0);
    }
    if (rightPaddleEdges.get("bottom") > this.canvas.height) {
      this.rightPaddle.setBottom(this.canvas.height);
    }

    // Move the ball
    if (!this.betweenRounds) {
      this.ball.move();
    }

    // Detect if the ball hit the top or bottom
    let edges = this.ball.getEdges();
    if (edges.get("top") < 0) {
      this.ball.setTop(0);
      this.ball.flipYSpeed();
    } else if (edges.get("bottom") > this.canvas.height) {
      this.ball.setBottom(this.canvas.height);
      this.ball.flipYSpeed();
    }

    // Detect if the ball hit the left paddle
    if (edges.get("left") < 100) {
      let paddleEdges = this.leftPaddle.getEdges();

      // Check if the paddle was hit
      if (edges.get("bottom") > paddleEdges.get("top") && edges.get("top") < paddleEdges.get("bottom")) {
        if (edges.get("left") <= paddleEdges.get("right") && edges.get("right") >= paddleEdges.get("left")) {
          this.ball.flipXSpeed();
          this.ball.setYSpeed(computeYSpeed(this.ball.y, edges.get("top"), edges.get("bottom"), this.leftPaddle.height, paddleEdges.get("top"), this.ball.ySpeed));
        }
      }
    }
    // Detect if the ball hit the right paddle
    else if (edges.get("right") > this.canvas.width - 100) {
      let paddleEdges = this.rightPaddle.getEdges();

      // Check if the paddle was hit
      if (edges.get("bottom") > paddleEdges.get("top") && edges.get("top") < paddleEdges.get("bottom")) {
        if (edges.get("right") >= paddleEdges.get("left") && edges.get("left") <= paddleEdges.get("right")) {
          this.ball.flipXSpeed();
          this.ball.setYSpeed(computeYSpeed(this.ball.y, edges.get("top"), edges.get("bottom"), this.rightPaddle.height, paddleEdges.get("top"), this.ball.ySpeed));
        }
      }
    }

    // Detect if someone scored
    if (!this.betweenRounds) {
      if (this.ball.x < 0) {
        this.score("Right")
      }
      else if (this.ball.x > this.canvas.width) {
        this.score("Left")
      }
    }

    // Redraw the screen
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.betweenRounds) {
      this.drawBall();
    }
    this.drawPaddles();
    this.drawCenterLine();
    this.drawScores();

    if (this.modifiers.reverse > 0) {
      this.modifiers.reverse--;
    }
    // Request another animation frame
    this.animationFrameId = window.requestAnimationFrame(() => this.run());
  }

  score(side) {
    this.betweenRounds = true;
    if (side === "Left") {
      this.leftScore++;
      if (this.leftScore >= 10) {
        setTimeout(() => this.pause(), 1);
        setTimeout(() => this.win("Left"), 5);
      }
    } else if (side ==="Right") {
      this.rightScore++;
      if (this.rightScore >= 10) {
        setTimeout(() => this.pause(), 1);
        setTimeout(() => this.win("Right"), 5);
      }
    }
    setTimeout(() => this.startNewRound(), 1000)
  }

  startNewRound() {
    let speed = Math.random();
    let location = Math.random() * 250;
    this.ball.x = 500;
    this.ball.y = 100 + location;
    if (speed < 1/5) {
      this.ball.setYSpeed(-6);
    } else if (speed < 2/5) {
      this.ball.setYSpeed(-4);
    } else if (speed < 3/5) {
      this.ball.setYSpeed(0);
    } else if (speed < 4/5) {
      this.ball.setYSpeed(4);
    } else {
      this.ball.setYSpeed(6);
    }
    this.betweenRounds = false;
  }

  win(side) {
    this.context.font = "50px serif"
    if (side === "Left") {
      this.context.fillText("Congratulations, you won and earned 10 coins", 500, 250, 750)
      shop.gain(10);
    } else {
      this.context.fillText("You lost, better luck next time", 500, 250 ,750)
    }
    this.context.font = "30px serif"
    this.context.fillText("Play again", 500, 300, 750)
    this.context.rect(425, 275, 150, 35);
    this.context.stroke();
    document.getElementById("play-again").style.display = "block"
    this.canvas.style.marginTop = "-35px"
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
    this.pause() // clear out the old animation frame or we start running at double the frame rate
    document.getElementById("play-button").style.display="none"
    this.canvas.style.marginTop="0"
    this.animationFrameId = window.requestAnimationFrame(() => this.run());
  }

  replay() {
    document.getElementById("play-again").style.display = "none"
    this.canvas.style.marginTop = "0px"
    this.context.font = "100px serif"
    this.leftScore = 0;
    this.rightScore = 0;
    this.leftPaddleUp = false;
    this.rightPaddleUp = false;
    this.leftPaddleDown = false;
    this.rightPaddleDown = false;
    this.betweenRounds = false;
    this.ball.x = 500;
    this.ball.y = 250;
    this.ball.xSpeed = -10;
    this.ball.ySpeed = 0;
    this.leftPaddle.y = 250;
    this.rightPaddle.y = 250;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawPaddles();
    this.drawScores();
    this.drawBall();
    this.drawCenterLine();
    this.modifiers = {
      reverse: 0
    }

    this.animationFrameId = window.requestAnimationFrame(() => this.run())
  }

  pause() {
    window.cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = -1;
  }

  addModifier(name) {
    if (name === "Reverse")
    this.modifiers.reverse += 3 * 60
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

function computeYSpeed(y, ballTop, ballBot, paddleHeight, paddleTop, currentSpeed) {
  if (ballTop > paddleTop + (paddleHeight * (4/5)) && ballTop <= paddleTop + paddleHeight) {
    return 8;
  }
  if (ballBot < paddleTop + (paddleHeight * (1/5)) && ballBot >= paddleTop) {
    return -8;
  }
  if (ballTop > paddleTop + (paddleHeight * (3/5)) && ballTop <= paddleTop + (paddleHeight * (4/5))) {
    return 4;
  }
  if (ballBot < paddleTop + (paddleHeight * (2/5)) && ballBot >= paddleTop + (paddleHeight * (1/5))) {
    return -4;
  }
  if (y >= paddleTop + (paddleHeight * (2/5)) && y <= paddleTop + (paddleHeight * (3/5))) {
    return 0;
  }
  return currentSpeed;
}
