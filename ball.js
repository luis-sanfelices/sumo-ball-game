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
  this.frame = options.frame;
  this.distanceToCenter = 200;
  this.distanceToBall = 400;

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

Ball.prototype.calculateDistanceToCenter = function() {
  this.distanceToCenter =  Math.sqrt(Math.pow(this.xPos,2) + Math.pow(this.yPos,2));
}

Ball.prototype.outOfTheRing = function(radius) {
  return this.distanceToCenter > radius;
}

Ball.prototype.calculateDistanceToBall = function(ball) {
  this.distanceToBall =  Math.sqrt(Math.pow((this.xPos-ball.xPos),2) + Math.pow((this.yPos-ball.yPos),2));
  ball.distanceToBall = this.distanceToBall;
}

Ball.prototype.ballColision = function() {
  return this.distanceToBall <= 2*this.radius;
}

Ball.prototype._collisionXSpeed = function(ball) {
  var distance = 0;
  var changeDirection = this._yCuadrantCollision(ball);  
  if (this.collision && ball.xSpeed != 0){
    if ((this._xCuadrantCollision(ball) === -1 && ball.xSpeed < 0) || 
        (this._xCuadrantCollision(ball) === 1 && ball.xSpeed > 0)) {
          ball.xCollisionSpeed += ball.xSpeed;
    } else {
      distance = Math.abs(ball.yPos - this.yPos);
      var anguloThis = Math.asin(distance/(2*this.radius));
      var anguloBall = (Math.PI/2) - anguloThis;
      this.xCollisionSpeed += ball.xSpeed*Math.cos(anguloThis)*Math.cos(anguloThis);
      this.yCollisionSpeed += - changeDirection* Math.abs(ball.xSpeed)*Math.cos(anguloThis)*Math.sin(anguloThis);
      ball.xCollisionSpeed += ball.xSpeed*Math.sin(anguloThis)*Math.cos(anguloBall);
      ball.yCollisionSpeed += changeDirection* Math.abs(ball.xSpeed)*Math.sin(anguloThis)*Math.sin(anguloBall);
    }
  }
}

Ball.prototype._collissionYSpeed = function(ball) {
  var distance = 0; 
  var changeDirection = this._xCuadrantCollision(ball);
  if (this.collision && ball.ySpeed != 0){
    if ((this._yCuadrantCollision(ball) === -1 && ball.ySpeed < 0) || 
    (this._yCuadrantCollision(ball) === 1 && ball.ySpeed > 0)) {
      ball.yCollisionSpeed += ball.xSpeed;
    } else {
      distance = Math.abs(ball.xPos - this.xPos);
      var anguloThis = Math.asin(distance/(2*this.radius));
      var anguloBall = (Math.PI/2) - anguloThis;
      this.yCollisionSpeed += ball.ySpeed*Math.cos(anguloThis)*Math.cos(anguloThis);
      this.xCollisionSpeed += - changeDirection * Math.abs(ball.ySpeed) * Math.cos(anguloThis) * Math.sin(anguloThis);
      ball.xCollisionSpeed += changeDirection * Math.abs(ball.ySpeed)*Math.sin(anguloThis) * Math.sin(anguloBall);
      ball.yCollisionSpeed += ball.ySpeed * Math.sin(anguloThis) * Math.cos(anguloBall);
    }
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

Ball.prototype._xCuadrantCollision = function(ball) {
  if (this.xPos > ball.xPos) {
    return -1;
  } else if (this.xPos < ball.xPos) {
    return 1;
  } else {
    return 0;
  }
}
Ball.prototype._yCuadrantCollision = function(ball) {
  if  (this.yPos > ball.yPos) {
    return -1;
  } else if (this.yPos < ball.yPos) { 
    return 1;
  } else {
    return 0;
  }
}

Ball.prototype.changeFrame = function(radius, ball) {
  if (this.xSpeed === 0 && this.ySpeed === 0 && ball.outOfTheRing(radius) ) {
    this.frame = 0;
  } else if (this.xSpeed != 0 && this.ySpeed != 0 && ball.outOfTheRing(radius) ) {
    this.frame = 1;
  } else if (this.distanceToBall > 300 && ball.distanceToCenter <= 0.75*radius && this.distanceToCenter <= 0.75*radius){
    this.frame = 10;
  } else if (ball.distanceToCenter > 0.9 && this.distanceToCenter < 0.75*radius ) {
    this.frame = 3;
  } else if (this.distanceToCenter > 0.9*radius) {
    this.frame = 2;
  } else if (this.distanceToCenter >= 0.75*radius) {
    this.frame = 4;
  } else if ( this.frame != 1 && (this.xSpeed != 0 || this.ySpeed != 0) && ball.outOfTheRing(radius) ) {
    this.frame = 9;
  }
}