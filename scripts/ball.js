class Ball {
  constructor(x, y, xSpeed, ySpeed, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  getEdges() {
    var edges = new Map();
    edges.set("left", this.x - this.radius)
    edges.set("right", this.x + this.radius)
    edges.set("top", this.y - this.radius)
    edges.set("bottom", this.y + this.radius)
    return edges;
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  flipYSpeed() {
    this.ySpeed *= -1;
  }

  flipXSpeed() {
    this.xSpeed *= -1;
  }

  setYSpeed(val) {
    this.ySpeed = val;;
  }

  setTop(val) {
    this.y = val + this.radius;
  }

  setBottom(val) {
    this.y = val - this.radius;
  }
}
