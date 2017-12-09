$(document).ready(function() {

    var game;
    var ctx;
    var countDownId;
    var counter = 3;

    $('.header-container').on('click','.start-button',function(){
        startGame();
       });
    $('.header-container').on('click','.back-button',function(){
        backToInit();
    });
    
    function startGame() {
        hideInitialWindow();
        createCanvas();
        countDownId = setInterval(countDown,1000);
        setTimeout(function() {
            createGame();
            game.start();
            clearInterval(countDownId);
        },4000);
    }

    function countDown() { 
        ctx.clearRect(0,0,600,600);
        if (counter > 0) {
            ctx.font = "100px monospace";
            ctx.fillText(counter,280,250);
        } else {
            ctx.font = "100px monospace";
            ctx.fillText("",280,250);
        }
        counter--;
    }

    function hideInitialWindow() {
        $('.header-container').toggleClass('header-container-board');
        $('.start-button').toggleClass('hide');
        $('#board-container').toggleClass('board-container');
    }

    function createCanvas() {
        $('#board-container').append(`<canvas id='sumo-ball' width='600' height='600'>` );
        var canvas = document.getElementById('sumo-ball');
        ctx = canvas.getContext("2d");
    }

    function createGame() {
        game = new Game({
            ball1: new Ball({radius:25,xPos:0,yPos:-200, color:"green", frame:10}),
            ball2: new Ball({radius:25,xPos:0,yPos:200, color:"blue", frame:10}),
            radius: 300,
            ctx: ctx
        });
    }

  });