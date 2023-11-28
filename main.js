var blocksize = 25;
var rows = 30
var cols = 30
var board ;
var context ;
var gameOver = false
let counter = 0
var  mvp = 10
//snake head 
var snakeX = 5 * blocksize
var snakeY = 5 * blocksize
//snake body 
var snakeBody =[]
//snake trackMovment 
var snakeMoveX = 0
var snakeMouveY = 0 
//target 
var foodX ;
var foodY ;
var button = document.getElementById("otherGameButton");
button.addEventListener("click", function() {
    // Redirect to the specified page1
    window.location.href = "index.html";
  });
var score = feed();
function feed() {
    var count = 1;
    return function () {
      return count++;
    };
  }
  //display the Mvp Score ! 
  function DisplayMvp(b) {
    return Math.max(mvp,b)
  }
  // diplay the mvp score in the html
  document.querySelector("#max").textContent = DisplayMvp(mvp) 
  // pick randomly the target location in the map 
function targetLocation() {
    foodX = Math.floor(Math.random() * cols) *blocksize
    foodY = Math.floor(Math.random() * rows) *blocksize
}
function changeDirection(event) {
    /* what happen here is douple check if 
    the snake is */
    if (event.code == 'ArrowUp' && snakeMouveY != 1) {
        snakeMoveX = 0;
        snakeMouveY = -1;
    } else if (event.code == 'ArrowDown' && snakeMouveY != -1) {
        snakeMoveX = 0;
        snakeMouveY = 1;
    } else if (event.code == 'ArrowRight' && snakeMoveX != -1) {
        snakeMouveY = 0;
        snakeMoveX = 1;
    } else if (event.code == 'ArrowLeft' && snakeMoveX != 1) {
        snakeMouveY = 0;
        snakeMoveX = -1;
    }
}
window.onload = function () {
    // get the id for the canvas board in html 
    board  = document.getElementById('board')
    board.height = rows * blocksize
    board.width = cols * blocksize
    //getcontext is for draw the board 
    context = board.getContext("2d")
    targetLocation()
    // track the snake mouve 
    document.addEventListener("keydown",function (event) {
        changeDirection(event)
    })
    //this update is called 1 time ! 
    //update()
    // now i need to call that function 100 times in the second 
    setInterval(update,1000/10)
    
    
   
}
function update() {

    if (gameOver) {
        window.location.href = 'GameOver.html'; 
        return
    }
    if (snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > rows * blocksize ) {
        gameOver = true
         window.location.href = 'GameOver.html'; 
        return
    }
    // draw the map 
    context.fillStyle ="black";
    context.fillRect(0,0,board.width,board.height)
    //color of the target !
    context.fillStyle = "green"
    context.fillRect(foodX,foodY,blocksize,blocksize)
    //check if the snake hit the target ! 
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX,foodY])
        var a = score()
        console.log(a);
        targetLocation()
        document.querySelector('#s').textContent=a
        var mvpCureent = DisplayMvp(a)   
        document.querySelector("#max").textContent = mvpCureent
        if ( a > mvp ) {
            window.location.href = 'Win.html';
        }

    }
   

     for (let i = snakeBody.length-1; i > 0 ; i--) {
        snakeBody[i] = snakeBody[i-1]
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX,snakeY]
    }  
    context.fillStyle = "red"
    snakeX += snakeMoveX*blocksize
    snakeY += snakeMouveY*blocksize
    context.fillRect(snakeX,snakeY,blocksize,blocksize)
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize)
        
    }
    // game over conditions !! 
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true 
          window.location.href = 'GameOver.html';    //lenaaaaaa!!!!!
          
        }   
        
    }
}
console.log('done');







