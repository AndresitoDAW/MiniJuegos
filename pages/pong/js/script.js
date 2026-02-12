const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Pelota
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 1,
  dy: 1
};

// Paletas
const paddleWidth = 10, paddleHeight = 100;
const leftPaddle = { x: 0, y: canvas.height/2 - paddleHeight/2, dy: 8 };
const rightPaddle = { x: canvas.width - paddleWidth, y: canvas.height/2 - paddleHeight/2, dy: 8 };

// Marcador
let scoreLeft = 0;
let scoreRight = 0;

// Dibujar pelota
function drawBall() {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
}

// Dibujar paletas
function drawPaddle(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Dibujar marcador
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(scoreLeft, canvas.width/4, 30);
  ctx.fillText(scoreRight, 3*canvas.width/4, 30);
}

// Reiniciar pelota
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx; // cambia dirección
  ball.dy = 3 * (Math.random() > 0.5 ? 1 : -1);
}

// Controles teclado
document.addEventListener("keydown", event => {
  if(event.key === "w" && leftPaddle.y > 0) leftPaddle.y -= leftPaddle.dy;
  if(event.key === "s" && leftPaddle.y + paddleHeight < canvas.height) leftPaddle.y += leftPaddle.dy;

  if(event.key === "ArrowUp") {
    event.preventDefault();
    if(rightPaddle.y > 0) rightPaddle.y -= rightPaddle.dy;
  }
  if(event.key === "ArrowDown") {
    event.preventDefault();
    if(rightPaddle.y + paddleHeight < canvas.height) rightPaddle.y += rightPaddle.dy;
  }
});

// Controles táctiles
document.getElementById("leftUp").addEventListener("touchstart", () => {
  if(leftPaddle.y > 0) leftPaddle.y -= leftPaddle.dy;
});
document.getElementById("leftDown").addEventListener("touchstart", () => {
  if(leftPaddle.y + paddleHeight < canvas.height) leftPaddle.y += leftPaddle.dy;
});
document.getElementById("rightUp").addEventListener("touchstart", () => {
  if(rightPaddle.y > 0) rightPaddle.y -= rightPaddle.dy;
});
document.getElementById("rightDown").addEventListener("touchstart", () => {
  if(rightPaddle.y + paddleHeight < canvas.height) rightPaddle.y += rightPaddle.dy;
});

// Actualizar juego
function update() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  drawBall();
  drawPaddle(leftPaddle.x, leftPaddle.y);
  drawPaddle(rightPaddle.x, rightPaddle.y);
  drawScore();

  // Mover pelota
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Rebote arriba/abajo
  if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // Rebote en paletas
  if(ball.x - ball.radius < leftPaddle.x + paddleWidth &&
     ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) {
    ball.dx *= -1;
  }

  if(ball.x + ball.radius > rightPaddle.x &&
     ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight) {
    ball.dx *= -1;
  }

  // Punto jugador derecho
  if(ball.x - ball.radius < 0) {
    scoreRight++;
    resetBall();
  }

  // Punto jugador izquierdo
  if(ball.x + ball.radius > canvas.width) {
    scoreLeft++;
    resetBall();
  }

  requestAnimationFrame(update);
}

update();
