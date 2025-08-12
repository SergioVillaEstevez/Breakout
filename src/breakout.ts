
let canvas  =  document.getElementById("gameCanvas") as HTMLCanvasElement;

const ctx = canvas.getContext("2d")


if(!ctx) throw new  Error("No se pudo obtener el contexto 2D")


let x= 210
let y= 250
let dx= 1
let dy= 1

let ballColor="" 

let paletaX= 205
const paletaY= 290
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
                    ctx.strokeStyle = "white";
                    ctx.fillStyle="green"
                    ctx.strokeRect(blockX, blockY, blockWidth, blockHeight);
                    
                    ctx.fill();
                    ctx.closePath();


                }
            




        }
    }
}




//dibujo de pelota
const drawBall = (ballColor)=>{
ctx.beginPath();
ctx.arc(x, y, 10, 0, Math.PI * 2);
ctx.fillStyle = ballColor;
ctx.fill();
ctx.closePath();
}

const clear = ()=>{ctx.clearRect(0,0,canvas.width,canvas.height)}


//dibujo de Paleta
const drawPaleta = (ballColor)=>{
    
    
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
    drawPaleta("black");
    drawBall("red");

    collisionDetection()
    
    x+=dx;
    y+=dy;
    
    if(x + 10 > canvas.width || x-10 < 0 ){
        dx  = -dx;
       
       

    }

    if(y + 10 > canvas.height || y-10< 0){
        dy = -dy;

        
        
       
    }

    if(y+10 > paletaY && x >= paletaX && x<= paletaX+80){
        dy=-dy
        
        //dy *= 1.1; 
      
    }







    requestAnimationFrame(gameLoop)


}

requestAnimationFrame(gameLoop)







