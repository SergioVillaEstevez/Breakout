
let canvas =  document.getElementById("gameCanvas") as HTMLCanvasElement;

const ctx = canvas.getContext("2d")


if(!ctx) throw new  Error("No se pudo obtener el contexto 2D")


let x= 50
let y= 50
let dx= 0.5
let dy= 0.5

let ballColor="" 

let paletaX= 205
const paletaY= 290
let paletaXmas= 0.5





canvas.addEventListener("click", ()=>{


        dx= -dx;
        dy=-dy;

})
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
    
    drawPaleta("black");
    drawBall("red");
    
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
        
        dy *= 1.1; 
      
    }







    requestAnimationFrame(gameLoop)


}

requestAnimationFrame(gameLoop)







