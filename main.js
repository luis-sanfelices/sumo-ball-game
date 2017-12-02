$(document).ready(function() {
    var game;
    var canvas = document.getElementById("sumo-ball");
    var ctx = canvas.getContext("2d");
  
    game = new Game({
        ball1: new Ball({radius:20,xPos:0,yPos:-100, color:"green"}),
        ball2: new Ball({radius:20,xPos:0,yPos:100, color:"blue"}),
        radius: 250,
        ctx: ctx
    });
  
    game.start();
  });