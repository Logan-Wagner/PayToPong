class Paddle {
  constructor(x, y, width, height, speed) {
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  move(direction) {
    if (direction === "Up") {
      this.y -= this.speed;
    } else if (direction === "Down") {
      this.y += this.speed;
    }
  }

  getEdges() {
    var edges = new Map();
    edges.set("left", this.x - (this.width / 2))
    edges.set("right", this.x + (this.width / 2))
    edges.set("top", this.y - (this.height / 2))
    edges.set("bottom", this.y + (this.height / 2))
    return edges;
  }

  setTop(val) {
    this.y = val + (this.height / 2);
  }

  setBottom(val) {
    this.y = val - (this.height / 2);
  }

  setY(val) {
    this.y = val;
  }
}
