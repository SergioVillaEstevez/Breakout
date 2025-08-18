var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
if (!ctx)
    throw new Error("No se pudo obtener el contexto 2D");
var marcador;
var x = 210;
var y = 250;
var dy = 1;
var dx = 1;
var vida = 3;
var ballColor = "";
var paletaX = 205;
var paletaY = 290;
var paletaXmas = 0.8;
var blockRowCount = 7;
var blockColumnCount = 10;
var blockWidth = 50;
var blockHeight = 20;
var blockPaddingX = 0; // espacio horizontal
var blockPaddingY = 0;
var blockOffsetTop = 0;
var blockOffsetLeft = 0;
var blocks = [];
for (var fila = 0; fila < blockRowCount; fila++) {
    blocks[fila] = [];
    for (var columna = 0; columna < blockColumnCount; columna++) {
        blocks[fila][columna] = { x: 0, y: 0, status: 1 };
    }
}
//colision bloques
var collisionDetection = function () {
    for (var fila = 0; fila < blockRowCount; fila++) {
        for (var columna = 0; columna < blockColumnCount; columna++) {
            var block = blocks[fila][columna];
            if (block.status === 1) {
                if (x > block.x && x < block.x + blockWidth && y > block.y && y < block.y + blockHeight) {
                    dy = -dy;
                    block.status = 0;
                }
            }
        }
    }
};
// dibujar vidas
var drawVidas = function () {
    ctx.font = "16px Arial"; // tamaño y fuente
    ctx.fillStyle = "white"; // color del texto
    ctx.fillText("Vidas: " + vida, 200, 270); // x=10, y=20
};
//Dibujar bloques
var drawBloques = function () {
    for (var fila = 0; fila < blockRowCount; fila++) {
        for (var columna = 0; columna < blockColumnCount; columna++) {
            var block = blocks[fila][columna];
            if (block.status === 1) {
                var blockX = (columna * (blockWidth + blockPaddingX) + blockOffsetLeft);
                var blockY = (fila * blockHeight) + blockOffsetTop;
                block.x = blockX;
                block.y = blockY;
                ctx.beginPath();
                ctx.rect(blockX, blockY, blockWidth, blockHeight);
                ctx.strokeStyle = "black";
                ctx.fillStyle = "pink";
                ctx.strokeRect(blockX, blockY, blockWidth, blockHeight);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
};
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
    drawBloques();
    drawVidas();
    drawPaleta("pink");
    drawBall("white");
    collisionDetection();
    x += dx;
    y += dy;
    if (x + 10 > canvas.width || x - 10 < 0) {
        dx = -dx;
    }
    if (y + 10 > paletaY) {
        if (x >= paletaX && x <= paletaX + 80) {
            // rebote en la paleta
            dy = -dy;
            y = paletaY - 10; // ajustar posición para no atascar
        }
        else if (y + 10 > canvas.height) {
            if (vida > 0) {
                x = 210;
                y = 250;
                paletaX = 205;
                paletaY = 290;
                dy = 1;
                dx = 1;
                vida = vida - 1;
            }
        }
    }
    if (y + 10 > paletaY && x >= paletaX && x <= paletaX + 80) {
        dy = -dy;
        y = paletaY - 10;
        dx = dx * 1.1;
        dy = dy * 1.1;
    }
    if (vida === 0) {
        alert("Game over");
        document.location.reload();
    }
    requestAnimationFrame(gameLoop);
};
requestAnimationFrame(gameLoop);
