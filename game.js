function Game(options) {
  this.ball1 = options.ball1;
  this.ball2 = options.ball2;
  this.radius = options.radius;
  this.ctx = options.ctx;
  this.player1Controls = {
    up: false,
    down: false,
    left: false,
    right: false
  };
  this.player2Controls = {
    up: false,
    down: false,
    left: false,
    right: false
  };
  this.finishGameTimeout = undefined;
}
Game.prototype._drawBoard = function() {
  this.ctx.fillStyle = "grey";  
  this.ctx.beginPath();
  this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
  this.ctx.stroke();
  this.ctx.fill();
};

Game.prototype._drawBall = function(ball) {
  var character = new Image(); 
  character.src = "Imagenes/sprite_memes_" + ball.color + ".png";
  var yPosFrame = 52 * ball.frame;
  this.ctx.drawImage(character,0,yPosFrame,50,50,ball.xPos - ball.radius,ball.yPos - ball.radius,2*ball.radius,2*ball.radius);
};

Game.prototype.start = function() {
  this.ctx.translate(300, 300);
  this._assignEvents();
  this._update();
};

Game.prototype._update = function() {
  this.ctx.clearRect(-300,-300,600,600);
  this._drawBoard();
  this._reduceRing();
  this.ball1.calculateDistanceToCenter();
  this.ball2.calculateDistanceToCenter();
  this.ball1.calculateDistanceToBall(this.ball2);
  if (this.ball1.outOfTheRing(this.radius) && !this.ball2.outOfTheRing(this.radius)) {
    this._setZeroSpeed(this.ball1);
    if (!this.finishGameTimeout)
      this.finishGameTimeout = setTimeout(this._finishGame.bind(this),2000);
  } else if (this.ball2.outOfTheRing(this.radius) && !this.ball1.outOfTheRing(this.radius)) {
    this._setZeroSpeed(this.ball2);
    if (!this.finishGameTimeout)
      this.finishGameTimeout = setTimeout(this._finishGame.bind(this),2000);
  } else if (this.ball2.outOfTheRing(this.radius) && this.ball1.outOfTheRing(this.radius)){
    this._setZeroSpeed(this.ball2);
    this._setZeroSpeed(this.ball1);
    if (!this.finishGameTimeout) 
      this.finishGameTimeout = setTimeout(this._finishGame.bind(this),2000);
  }
  if (!this.ball1.collision && this.ball1.ballColision()) {
    this.ball1.collision = true;
    this.ball2.collision = true;
    this.ball1.collisionSpeed(this.ball2);
    this.ball2.collisionSpeed(this.ball1);
    this.ball1.speedAfterCollision();
    this.ball2.speedAfterCollision();
  } else if (!this.ball1.ballColision()) {
    this.ball1.collision = false;
    this.ball2.collision = false;
  }
  this.ball1.changeFrame(this.radius, this.ball2);
  this.ball2.changeFrame(this.radius, this.ball1);
  this.ball1.move();
  this.ball2.move();
  this.ball1.changeSpeed(this.player1Controls);
  this.ball2.changeSpeed(this.player2Controls);
  this._drawBall(this.ball1);
  this._drawBall(this.ball2);
  this.animationId = window.requestAnimationFrame(this._update.bind(this));
};

Game.prototype._assignControlsToKeys = function( downOrUp,event) {
  switch (event.keyCode) {
    case 38: //arrow up
      this.player1Controls.up = downOrUp;
      break;
    case 40: //arrow down
      this.player1Controls.down = downOrUp;
      break;
    case 37: //arrow left
      this.player1Controls.left = downOrUp;
      break;
    case 39: //arrow right
      this.player1Controls.right = downOrUp;
      break;
    case 87: //arrow up
      this.player2Controls.up = downOrUp;
      break;
    case 83: //arrow down
      this.player2Controls.down = downOrUp;
      break;
    case 65: //arrow left
      this.player2Controls.left = downOrUp;
      break;
    case 68: //arrow right
      this.player2Controls.right = downOrUp;
      break;
    case 13: //enter
      if (downOrUp)
        this.startAgain();
  };
};

Game.prototype._assignEvents = function() {
  document.onkeydown = this._assignControlsToKeys.bind(this,true);
  document.onkeyup = this._assignControlsToKeys.bind(this,false);
};

Game.prototype._reduceRing = function() {
  this.radius -= 0.05;
}

Game.prototype._finishGame = function() {
  this.ctx.fillStyle = 'black';
  this.ctx.font = "30px monospace";
  if(this.ball1.outOfTheRing(this.radius) && this.ball2.outOfTheRing(this.radius)){
    this.ctx.fillText("Draw",-30,0);
  } else if (this.ball1.outOfTheRing && !this.ball2.outOfTheRing(this.radius)) {
    this._setZeroSpeed(this.ball2);
    this.ctx.fillText("Player 1 wins",-100,0);
  } else {
    this._setZeroSpeed(this.ball1);
    this.ctx.fillText("Player 1 wins",-100,0);    
  }
  this.ctx.font = "20px monospace";
  this.ctx.fillText("Press Enter",-60,40);
  window.cancelAnimationFrame(this.animationId );
}

Game.prototype.startAgain = function() {
  window.cancelAnimationFrame(this.animationId );
  if (this.finishGameTimeout) {
    clearTimeout(this.finishGameTimeout);
    this.finishGameTimeout = undefined;
  }
  this.ball1.xPos = 0;
  this.ball1.yPos = -200;
  this._setZeroSpeed(this.ball1);
  this.ball2.xPos = 0;
  this.ball2.yPos = 200;
  this._setZeroSpeed(this.ball2);
  this.radius = 300;
  this._update();
}

Game.prototype._setZeroSpeed = function(ball) {
  ball.xSpeed = 0;
  ball.ySpeed = 0;
}