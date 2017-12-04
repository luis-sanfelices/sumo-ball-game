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
  this.ctx.fillStyle = "black";
  this.ctx.fill()
  this.ctx.stroke()
  this.ctx.fillStyle = "grey";
  this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
  this.ctx.fill();
};

Game.prototype._drawBall = function(ball) {
  this.ctx.beginPath();
  this.ctx.fillStyle = ball.color;
  this.ctx.arc(ball.xPos, ball.yPos, ball.radius, 0, 2 * Math.PI);
  this.ctx.fill();
  this.ctx.stroke();
};

Game.prototype.start = function() {
  this.ctx.translate(250, 250);
  this._assignControlsToKeys();
  window.requestAnimationFrame(this._update.bind(this));
};

Game.prototype._update = function() {
  this._drawBoard();
  if (this.ball1.outOfTheRing(this.radius)) {
    alert("blue wins")
  }
  if (this.ball2.outOfTheRing(this.radius)) {
    alert("green wins")
  }
  if (!this.ball1.collision && this.ball1.ballColision(this.ball2)){
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
  this.ball1.move();
  this.ball2.move();
  this.ball1.changeSpeed(this.player1Controls);
  this.ball2.changeSpeed(this.player2Controls);
  this._drawBall(this.ball1);
  this._drawBall(this.ball2);
  window.requestAnimationFrame(this._update.bind(this));
};

Game.prototype._assignControlsToKeys = function() {
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 38: //arrow up
        this.player1Controls.up = true;
        break;
      case 40: //arrow down
        this.player1Controls.down = true;
        break;
      case 37: //arrow left
        this.player1Controls.left = true;
        break;
      case 39: //arrow right
        this.player1Controls.right = true;
        break;
      case 87: //arrow up
        this.player2Controls.up = true;
        break;
      case 83: //arrow down
        this.player2Controls.down = true;
        break;
      case 65: //arrow left
        this.player2Controls.left = true;
        break;
      case 68: //arrow right
        this.player2Controls.right = true;
        break;
    }
  }.bind(this);
  document.onkeyup = function(e) {
    switch (e.keyCode) {
      case 38: //arrow up
        this.player1Controls.up = false;
        break;
      case 40: //arrow down
        this.player1Controls.down = false;
        break;
      case 37: //arrow left
        this.player1Controls.left = false;
        break;
      case 39: //arrow right
        this.player1Controls.right = false;
        break;
      case 87: //arrow up
        this.player2Controls.up = false;
        break;
      case 83: //arrow down
        this.player2Controls.down = false;
        break;
      case 65: //arrow left
        this.player2Controls.left = false;
        break;
      case 68: //arrow right
        this.player2Controls.right = false;
        break;
    }
  }.bind(this);
};
