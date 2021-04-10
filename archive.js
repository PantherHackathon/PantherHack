 //left lines
 for(let i = 0; i<5; i++){
    ctx.drawImage(white, this.sX, this.sY, this.sW, this.sH, this.dX/3 - this.dW/2, this.dY + i*this.dH + i*this.gap, this.dW, this.dH);
}

//right lines
for(let i =0; i<5; i++){
    ctx.drawImage(white, this.sX, this.sY, this.sW, this.sH, 2*this.dX/3 - this.dW/2, this.dY + i*this.dH + i*this.gap, this.dW, this.dH);
}



// onevent handlers
document.addEventListener("keydown", function(event){
    

    if(event.key == "ArrowLeft"){
        racingCar.moveLeft();
    }
});

document.addEventListener("keydown", function(event){
    

    if(event.key == "ArrowRight"){
        racingCar.moveRight();
    }
});



// collision detector (SOMETHING IS WRONG)

if(racingCar.dX > p.x 
    && racingCar.dX < p.x + 120
    && racingCar.dY > p.y
    && racingCar.dY < p.y + 90){

        state.current = state.over;
    }