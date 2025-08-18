
let canvas  =  document.getElementById("gameCanvas") as HTMLCanvasElement;

const ctx = canvas.getContext("2d")


    if(!ctx) throw new  Error("No se pudo obtener el contexto 2D")

let marcador; 
let x= 210
let y= 250
let dy= 1
let dx= 1

let vida: number=3; 

let ballColor: string ="" 

let paletaX= 205
let paletaY= 290
let paletaXmas= 0.8


const blockRowCount = 7;
const blockColumnCount = 10;
const blockWidth = 50;
const blockHeight = 20;
const blockPaddingX = 0; // espacio horizontal
const blockPaddingY = 0;
const blockOffsetTop = 0;
const blockOffsetLeft = 0;

const blocks : {x: number, y: number, status: number}[][]=[]


for (let fila = 0; fila< blockRowCount; fila++){

     blocks[fila] = [];

    for(let columna =0; columna< blockColumnCount;columna++){

            blocks[fila][columna]= {x:0,y:0,status:1}
    }


}

//colision bloques

const collisionDetection =()=>{

    for(let fila= 0; fila< blockRowCount; fila++){
        for (let columna = 0; columna < blockColumnCount; columna++){

            const block = blocks[fila][columna];

            if(block.status === 1){

                if(x>block.x && x < block.x + blockWidth && y> block.y && y< block.y + blockHeight){

                    dy= -dy;
                    block.status=0;

                }

            }


        }
    }

}
// dibujar vidas
const drawVidas = () => {
    ctx.font = "16px Arial";       // tamaño y fuente
    ctx.fillStyle = "white";       // color del texto
    ctx.fillText("Vidas: " + vida, 200, 270); // x=10, y=20
};



//Dibujar bloques

const drawBloques=()=>{
    for (let fila=0;fila<blockRowCount;fila++){
        for(let columna=0; columna< blockColumnCount;columna++){

                const block = blocks[fila][columna];

                if(block.status===1){
                    let blockX= (columna * (blockWidth + blockPaddingX) + blockOffsetLeft);
                    let blockY=(fila * blockHeight) + blockOffsetTop;


                    block.x=blockX;
                    block.y=blockY;

                    ctx.beginPath();
                    ctx.rect(blockX,blockY, blockWidth,blockHeight)
                    ctx.strokeStyle = "black";
                    ctx.fillStyle="pink"
                    ctx.strokeRect(blockX, blockY, blockWidth, blockHeight);
                    
                    ctx.fill();
                    ctx.closePath();


                }
            




        }
    }
}




//dibujo de pelota
const drawBall = (ballColor:string)=>{
ctx.beginPath();
ctx.arc(x, y, 10, 0, Math.PI * 2);
ctx.fillStyle = ballColor;
ctx.fill();
ctx.closePath();
}

const clear = ()=>{ctx.clearRect(0,0,canvas.width,canvas.height)}


//dibujo de Paleta
const drawPaleta = (ballColor:string)=>{
    
    
    ctx.fillStyle=ballColor
    ctx.fillRect(paletaX,paletaY, 80,20)
    
    




}


//mover la paleta

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        paletaX -= 15;
    }
    if (event.key === "ArrowRight") {
        paletaX += 15;
    }
});




//mover la pelota
const gameLoop =()=>{

    clear();
    drawBloques();
    drawVidas();
    drawPaleta("pink");
    drawBall("white");

    collisionDetection()
    
    x+=dx;
    y+=dy;
    
    if(x + 10 > canvas.width || x-10 < 0 ){
        dx  = -dx;
       
       

    }

  if (y + 10 > paletaY) {
    if (x >= paletaX && x <= paletaX + 80) {
        // rebote en la paleta
        dy = -dy;
        y = paletaY - 10; // ajustar posición para no atascar
    } else if (y + 10 > canvas.height) {
        if(vida>0){
            x= 210
            y= 250
            paletaX= 205
            paletaY= 290

             dy= 1
                dx= 1
            vida= vida - 1
            
        }

        
    }
}

    if(y+10 > paletaY && x >= paletaX && x<= paletaX+80){
        dy=-dy

        y= paletaY -10

        dx= dx*1.1;
        dy= dy*1.1;
        
     
      
    }

    if(vida===0){

        alert("Game over")
        document.location.reload()
        
    }







    requestAnimationFrame(gameLoop)


}

requestAnimationFrame(gameLoop)







