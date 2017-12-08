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
  if (this.ball1.outOfTheRing(this.radius)) {
    this.ball1.xSpeed = 0;
    this.ball1.ySpeed = 0;
  }
  if (this.ball2.outOfTheRing(this.radius)) {
    this.ball2.xSpeed = 0;
    this.ball2.ySpeed = 0;
  }
  if (!this.ball1.collision && this.ball1.ballColision()) {
    this.ball1.collision = true;
    this.ball2.collision = true;
    this.ball1.collisionSpeed(this.ball2);
    this.ball2.collisionSpeed(this.ball1);
    this.ball1.speedAfterCollision();
    this.ball2.speedAfterCollision();
  } else if (!this.ball1.ballColision(this.ball2)) {
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
  window.requestAnimationFrame(this._update.bind(this));
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
  };
};

Game.prototype._assignEvents = function() {
  document.onkeydown = this._assignControlsToKeys.bind(this,true);
  document.onkeyup = this._assignControlsToKeys.bind(this,false);
};

Game.prototype._reduceRing = function() {
  this.radius -= 0.05;
}