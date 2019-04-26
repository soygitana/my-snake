// getting elements

const playground = document.querySelector('canvas');
const ctx = playground.getContext('2d');
const scoreBox = document.querySelector('#scoreBox');
document.addEventListener("keydown", moveSnake);

playground.width = 500;
playground.height = 500;

// setting colors and size of snake and food
const gridSize = 25;
const snakeColor = "rgb(223, 46, 119)";
const foodColor =  "rgba(7, 202, 144, 0.986)";
const extraFoodColor = "rgba(7, 163, 116, 0.986)";


// variables declaration
let tileCount = playground.width / gridSize;
let velocityX = 0;
let velocityY = 0;
const trail = [];
const fruits = [];
let tail = 5;

//FUNCTIONS

function getTileCoord() {
  return Math.floor(Math.random() * tileCount);
}

let snakeX = playground.width / 2 - gridSize / 2;
let snakeY = playground.height / 2 - gridSize / 2;

function getRandomType(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
 }


function drawPlayground() {
  ctx.fillStyle =  "rgb(253, 253, 253)";
  ctx.fillRect(0, 0, playground.width, playground.height);
}


// function to control snake's movement
function moveSnake(ev) {
const oldX = velocityX;
const oldY = velocityY;

  switch (ev.keyCode) {
    case 37:
      velocityX = -1;
      velocityY = 0;
      break;
    case 38:
      //move up
      velocityX = 0;
      velocityY = -1;
      break;
    case 39:
      //move right
      velocityX = 1;
      velocityY = 0;
      break;
    case 40:
      //move down
      velocityX = 0;
      velocityY = 1;
      break;
  }

  if ((velocityX !== 0 && oldX !== 0 && velocityX !== oldX)
      || (velocityY !== 0 && oldY !== 0 && velocityY !== oldY)) {
    velocityX = oldX;
    velocityY = oldY;
  }
}


// drawing fruits
function drawFruits()
{
    
  for(let i = 0; i < fruits.length; i++)
  {
    const fruit = fruits[i];

    ctx.beginPath();
    ctx.fillStyle = fruit.color;
    ctx.arc(fruit.x * gridSize, fruit.y * gridSize, 10, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

// function which makes snake grow after eating 
function snakeEat()
{
  for(let i = 0; i < fruits.length; i++)
  {
    const fruit = fruits[i];

    if(snakeX === fruit.x && snakeY === fruit.y)
    {
      tail += fruit.points;
      scoreBox.innerHTML = tail - 5;
      fruits.splice(i, 1);

      giveFruit();

      if(getRandomType(1, 10) === 10)
        giveSpecialFruit();
    }
  }
}


// givinig food function
function giveFruit()
{
  fruits.push({x: getTileCoord(), y: getTileCoord(), points: 1, color: foodColor});
}

function giveSpecialFruit()
{
  fruits.push({x: getTileCoord(), y: getTileCoord(), points: 3, color: extraFoodColor});
}


// game over function
function onGameOver() {
  alert("Game over! :( Your score: " + (tail - 5) + " points. Play again!");
  location.reload();
}

// drawing snake
function drawSnake() {

  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX < 0) {
    snakeX = tileCount - 1;
  }
  if (snakeX > tileCount - 1) {
    snakeX = 0;
  }
  if (snakeY < 0) {
    snakeY = tileCount - 1;
  }
  if (snakeY > tileCount - 1) {
    snakeY = 0;
  }

  drawPlayground();

  ctx.fillStyle = snakeColor;

  for (let i = 0; i < trail.length; i++) {
    const {x, y} = trail[i];
    ctx.beginPath();
    ctx.arc(x * gridSize, y * gridSize, 10, 0, 2 * Math.PI, false);
    ctx.fill();
    if ((x === snakeX && y === snakeY) && (snakeX !== 0 || snakeY !== 0)) {
        ctx.beginPath();
        ctx.arc(x * gridSize, y * gridSize, 10, 0, 2 * Math.PI, false);
        ctx.fill();
      setTimeout(onGameOver, 100);
    }
  }

  trail.push({x: snakeX, y: snakeY});

  while (trail.length > tail) {
    trail.shift();
  }
}

function onGame() {
  drawSnake();
  drawFruits();
  snakeEat();
}

(function playGame(){
  giveFruit();
  setInterval(onGame, 100);
}());

