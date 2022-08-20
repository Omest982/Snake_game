const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/carrot.png";

let box = 32;
let score = 0;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
//Задание головы змеи по центру
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};
//При каждом нажатии клавиши вызывается ивент
document.addEventListener("keydown", direction);

let dir;
//Задание направления
function direction(event) {
  if (event.keyCode == 37 && dir != "right") {
    dir = "left";
  } else if (event.keyCode == 38 && dir != "down") {
    dir = "up";
  } else if (event.keyCode == 39 && dir != "left") {
    dir = "right";
  } else if (event.keyCode == 40 && dir != "up") {
    dir = "down";
  }
}
//Проверка не ударился ли игрок в свое тело
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      ctx.fillStyle = "white";
      ctx.font = "50px Aral";
      ctx.fillText("You lose", box * 7, box * 10);
    }
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);
  //Отрисовка змеи
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  //Вывод счета на экран
  ctx.fillStyle = "white";
  ctx.font = "50px Aral";
  ctx.fillText(score, box * 2.5, box * 1.6);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  //Проверка координат еды и головы, если равны то не удаляется последний элемент змеи
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }
  //Проверка не вышел ли игрок за поле
  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * box ||
    snakeY > box * 17
  ) {
    // Остановка игры если игрок вышел за поле
    clearInterval(game);
    ctx.fillStyle = "white";
    ctx.font = "50px Aral";
    ctx.fillText("You lose", box * 7, box * 10);
  }
  //Обработка направления движения
  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;
  //Новые координаты головы после обработки направления движения
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  //Проверка сьели ли хвост
  eatTail(newHead, snake);
  //Добавление элемента в начало змейки
  snake.unshift(newHead);
}
//Интервал с которым обновляються рисунки (идет игра)
let game = setInterval(drawGame, 200);
