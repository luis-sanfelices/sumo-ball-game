$(document).ready(function() {

    var game;
    var ctx;
    var countDownId;
    var counter = 3;
    var board = 1;
    var boardId;
    var startGameId;

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
        startGameId = setTimeout(function() {
            createGame();
            game.start();
            clearInterval(countDownId);
        },4000);
    }

    function backToInit() {
        if (game) 
            game.stop();
        backInitialWindow()
        deleteCanvas();
        deleteGame();
        clearInterval(countDownId);
        clearTimeout(startGameId);
        counter = 3;
    }

    function countDown() { 
        ctx.clearRect(0,0,600,600);
        if (counter > 0) {
            ctx.font = "100px monospace";
            ctx.fillText(counter,330,300);
        } else {
            ctx.font = "100px monospace";
            ctx.fillText("",330,300);
        }
        counter--;
    }

    function hideInitialWindow() {
        $('.header-container').toggleClass("header-container-board")
        $('.start-button').toggleClass('hide');
        $('#board-container').toggleClass('board-container');
        $('.back-button').toggleClass('hide');
        boardId = setInterval( function() { 
            board = board === 1?2:1;
            var style = "url(Imagenes/board_background_"+ board +".png) no-repeat"
            $( ".board-container" ).css( "background",style);
        },500);

    }

    function backInitialWindow() {
        $('.header-container').toggleClass("header-container-board")
        $('.start-button').toggleClass('hide');
        $('#board-container').toggleClass('board-container');
        $('.back-button').toggleClass('hide');
        clearInterval(boardId);
    }
    
    function createCanvas() {
        $('#board-container').append(`<canvas id='sumo-ball' width='700' height='700'>` );
        var canvas = document.getElementById('sumo-ball');
        ctx = canvas.getContext("2d");
    }

    function deleteCanvas() {
        $('#board-container').empty();
    }

    function createGame() {
        game = new Game({
            ball1: new Ball({radius:25,xPos:0,yPos:-200, color:"green", frame:10}),
            ball2: new Ball({radius:25,xPos:0,yPos:200, color:"blue", frame:10}),
            radius: 290,
            ctx: ctx
        });
    }

    function deleteGame() {
        game = undefined;
    }

  });