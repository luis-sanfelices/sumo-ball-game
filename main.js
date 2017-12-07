$(document).ready(function() {
    var game;
    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    //var canvas = document.getElementById("sumo-ball");
    var ctx = canvas.getContext("2d");
  
    game = new Game({
        ball1: new Ball({radius:25,xPos:0,yPos:-300, color:"green", frame:10}),
        ball2: new Ball({radius:25,xPos:0,yPos:300, color:"blue", frame:10}),
        radius: 400,
        ctx: ctx
    });
  
    game.start();
  });