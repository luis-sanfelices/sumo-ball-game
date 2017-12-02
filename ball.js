function Ball(options) {
  this.color = options.color;
  this.radius = options.radius;
  this.xPos = options.xPos;
  this.yPos = options.yPos;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.distanceToCenter = 0;
  this.move();
}

Ball.prototype.move = function() {
  if (!this.moveIntervalId) {
    this.moveIntervalId = setInterval(this._newPos.bind(this), 10);
  }
};

Ball.prototype._newPos = function() {
  this.xPos += this.xSpeed;
  this.yPos += this.ySpeed;
};

Ball.prototype.changeSpeed = function(controls) {
  if (controls.up) {
    this.ySpeed -= 0.05;
  }
  if (controls.down) {
    this.ySpeed += 0.05;
  }
  if (controls.left) {
    this.xSpeed -= 0.05;
  }
  if (controls.right) {
    this.xSpeed += 0.05;
  }
};

Ball.prototype._distanceToCenter = function() {
  return Math.sqrt(Math.pow(this.xPos,2) + Math.pow(this.yPos,2));
}

Ball.prototype.outOfTheRing = function(radius) {
  return this._distanceToCenter() > radius;
}

Ball.prototype._distanceToBall = function(ball) {
  return Math.sqrt(Math.pow((this.xPos-ball.xPos),2) + Math.pow((this.yPos-ball.yPos),2));
}

Ball.prototype.ballColision = function(ball) {
  return this._distanceToBall(ball) < 2*this.radius;
}

Ball.prototype.bounce = function(ball) {

}