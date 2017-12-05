$(document).ready(function() {
    var game;
    var canvas = document.getElementById("sumo-ball");
    var ctx = canvas.getContext("2d");
  
    game = new Game({
        ball1: new Ball({radius:25,xPos:0,yPos:-300, color:"green"}),
        ball2: new Ball({radius:25,xPos:0,yPos:300, color:"blue"}),
        radius: 400,
        ctx: ctx
    });
  
    game.start();
  });