var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
var x = canvas.width/2;
var y = canvas.height-50;
var dx = 2;
var dy = -2;
var ballRadius = 5;
var paddleHeight = 6;
var paddleWidth = 50;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 12;
var brickWidth = 20;
var brickHeight = 10;
var brickPadding = 6;
var brickOffsetTop = 20;
var brickOffsetLeft = 10;
var bricks = [];
var score = 0;
for (var c= 0; c<brickColumnCount;c++) {
  bricks[c]=[];
  for(var r = 0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1};
  }
}
//console.log(bricks);

function drawBall() {
    ctx.beginPath();
  ctx.arc(x,y,ballRadius,0,Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
  ctx.fillStyle= "green";
  ctx.fill();
  ctx.closePath();
}

function drawBricks(){
  for(var i = 0; i<brickColumnCount;i++){
    for(var j=0;j<brickRowCount;j++){
      if(bricks[i][j].status == 1) {
     
        bricks[i][j].x = (i*(brickWidth+brickPadding))+brickOffsetLeft;
        bricks[i][j].y = (j*(brickWidth+brickPadding))+brickOffsetTop;
        ctx.beginPath();
        ctx.rect(bricks[i][j].x, bricks[i][j].y,brickWidth,brickHeight);
        ctx.fillStyle= "blue";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
console.log(bricks);

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();
  x += dx;
  y += dy;
  
  if (y+dy < ballRadius) {
    dy = -dy;
  }
  
  if (x+dx > canvas.width-ballRadius || x+dx < ballRadius) {
    dx = -dx;
  }
  
  if (y+dy > canvas.height-ballRadius) {
    if(x > paddleX && x< paddleX+paddleWidth) {
     dy = -dy; 
    } else {
    alert("Game Over"); 
    document.location.reload(); 
    clearInterval(interval);
    }
  }
  
  if (leftPressed && paddleX > 0) paddleX -= 7;
  if (rightPressed && paddleX+paddleWidth < canvas.width) paddleX += 7;
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e) {
  if ( e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
   else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
  
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
   else if(e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
  
}

function collisionDetection() {
  for(var c=0;c<brickColumnCount;c++){
    for(var r=0;r<brickRowCount;r++){
      
      if(bricks[c][r].status ==1 && x > bricks[c][r].x && x < bricks[c][r].x+brickWidth && y > bricks[c][r].y && y < bricks[c][r].y+brickHeight) {
        dy = -dy;
        bricks[c][r].status = 0;
        score+=10;
        if (score === brickRowCount*brickColumnCount*10) {
          alert("You Win!!!\nScore:"+score);
          document.location.reload();
          clearInterval(interval);
        }
      }
      
    }
  }
}

function drawScore(){
  ctx.font = "11px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Score:" + score,1,12);
}


var interval = setInterval(draw,15);