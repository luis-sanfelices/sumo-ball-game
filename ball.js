function Ball(options) {
  this.color = options.color;
  this.radius = options.radius;
  this.xPos = options.xPos;
  this.yPos = options.yPos;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.xCollisionSpeed = 0;
  this.yCollisionSpeed = 0;
  this.distanceToCenter = 0;
  this.collision = false;
}

Ball.prototype.move = function() {
  this._newPos();
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
  return this._distanceToBall(ball) <= 2.2*this.radius;
}

Ball.prototype._collisionXSpeed = function(ball) {
  var distance = 0;  
  if (this.collision && ball.xSpeed != 0){
    distance = Math.abs(ball.yPos - this.yPos);
    var anguloThis = Math.asin(distance/(2*this.radius));
    var anguloBall = (Math.PI/2) - anguloThis;
    this.xCollisionSpeed += ball.xSpeed*Math.cos(anguloThis)*Math.cos(anguloThis);
    this.yCollisionSpeed += ball.xSpeed*Math.cos(anguloThis)*Math.sin(anguloThis);
    ball.xCollisionSpeed += ball.xSpeed*Math.sin(anguloThis)*Math.cos(anguloBall);
    ball.yCollisionSpeed += ball.xSpeed*Math.sin(anguloThis)*Math.sin(anguloBall);
  }
}

Ball.prototype._collissionYSpeed = function(ball) {
  var distance = 0;  
  if (this.collision && ball.ySpeed != 0){
    distance = distance = Math.abs(ball.xPos - this.xPos);
    var anguloThis = Math.asin(distance/(2*this.radius));
    var anguloBall = (Math.PI/2) - anguloThis;
    this.yCollisionSpeed += ball.ySpeed*Math.cos(anguloThis)*Math.sin(anguloThis);
    this.xCollisionSpeed += ball.ySpeed*Math.cos(anguloThis)*Math.cos(anguloThis);
    ball.xCollisionSpeed += ball.ySpeed*Math.sin(anguloThis)*Math.cos(anguloBall);
    ball.yCollisionSpeed += ball.ySpeed*Math.sin(anguloThis)*Math.sin(anguloBall);
  }
}

Ball.prototype.collisionSpeed = function(ball) {
  this._collisionXSpeed(ball);
  this._collissionYSpeed(ball);
}

Ball.prototype.speedAfterCollision = function() {
  this.xSpeed = this.xCollisionSpeed;
  this.ySpeed = this.yCollisionSpeed;
  this.xCollisionSpeed = 0;
  this.yCollisionSpeed = 0;
}