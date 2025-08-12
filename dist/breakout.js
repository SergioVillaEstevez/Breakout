var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
if (!ctx)
    throw new Error("No se pudo obtener el contexto 2D");
var x = 50;
var y = 50;
var dx = 0.5;
var dy = 0.5;
var ballColor = "";
var paletaX = 205;
var paletaY = 290;
var paletaXmas = 0.5;
canvas.addEventListener("click", function () {
    dx = -dx;
    dy = -dy;
});
//dibujo de pelota
var drawBall = function (ballColor) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
};
var clear = function () { ctx.clearRect(0, 0, canvas.width, canvas.height); };
//dibujo de Paleta
var drawPaleta = function (ballColor) {
    ctx.fillStyle = ballColor;
    ctx.fillRect(paletaX, paletaY, 80, 20);
};
//mover la paleta
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        paletaX -= 15;
    }
    if (event.key === "ArrowRight") {
        paletaX += 15;
    }
});
//mover la pelota
var gameLoop = function () {
    clear();
    drawPaleta("black");
    drawBall("red");
    x += dx;
    y += dy;
    if (x + 10 > canvas.width || x - 10 < 0) {
        dx = -dx;
    }
    if (y + 10 > canvas.height || y - 10 < 0) {
        dy = -dy;
    }
    if (y + 10 > paletaY && x >= paletaX && x <= paletaX + 80) {
        dy = -dy;
        dy *= 1.1;
    }
    requestAnimationFrame(gameLoop);
};
requestAnimationFrame(gameLoop);
