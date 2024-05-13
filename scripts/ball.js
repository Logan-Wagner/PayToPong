class Ball {
  constructor(x, y, dimension, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.dimension = dimension;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  getEdges() {
    var edges = new Map();
    edges.set("left", this.x - (this.dimension / 2))
    edges.set("right", this.x + (this.dimension / 2))
    edges.set("top", this.y - (this.dimension / 2))
    edges.set("bottom", this.y + (this.dimension / 2))
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
    this.y = val + (this.dimension / 2);
  }

  setBottom(val) {
    this.y = val - (this.dimension / 2);
  }
}
