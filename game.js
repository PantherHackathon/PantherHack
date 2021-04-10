// Setting up the canvas  
const canvas = document.getElementById("carGame");
const ctx = canvas.getContext("2d");

// global vars 
let frames = 0;
let random = 0;

// load images 
const car = new Image();
car.src = "img/car.png"; // Source : http://clipartmag.com/download-clipart-image#car-top-view-20.png

const block = new Image();
block.src = "img/block.png"; //Source : https://www.hiclipart.com/free-transparent-background-png-clipart-hwlex

const cone = new Image();
cone.src = "img/cone.png";  // source: https://www.pngwing.com/en/free-png-kyqwr

const accident = new Image();
accident.src = "img/accident.png";  // source: https://www.pngflow.com/en/free-transparent-png-yijvb

const white = new Image();
white.src = "img/white.jpeg";  

// load sounds
const audio = new Audio('audio/crash.wav'); // source : https://www.findsounds.com/ISAPI/search.dll?keywords=crash

const start = new Audio('audio/start.wav'); // source : https://freesound.org/people/Bertrof/sounds/131660/

// game states
const state = {
    current : 0,
    ready : 0,
    game : 1,
    over : 2
}

// onevent handlers
// left arrow key  control
document.addEventListener("keydown", function(event){
    switch(state.current){
        case state.ready:
            state.current = state.game;
            start.play();
            break;
        case state.game:
            if(event.key == "ArrowLeft"){
                racingCar.moveLeft();  
            }
            break;
        case state.over: 
            break;
    }
});

// right arrow key control
document.addEventListener("keydown", function(event){
    switch(state.current){
        case state.ready:
            state.current = state.game;
            break;
        case state.game:
            if(event.key == "ArrowRight"){
                racingCar.moveRight();
            }
            break;
        case state.over: 
             break;         
    }
});

// space control
document.addEventListener("keydown", function(event){
    if(event.key == " "){
            obstacles.reset();
            whiteLine.reset();
            racingCar.reset();
            intro.reset(); 
            state.current = state.ready;
    }
});

// Game intro
const intro = {

    score : 0,

    draw : function(){
        
        ctx.fillStyle = "#FB2";
        ctx.font = "40px Teko";

        // draws ready page 
        if(state.current == state.ready){
            ctx.font = "40px Teko";
            ctx.fillText("Use right or left arrow", 5, 220);
            ctx.fillText("keys to play!", 68, 257);
        }
        
        // draws the score during game
        if(state.current == state.game){
            ctx.font = "50px Teko";
            ctx.fillText(this.score, canvas.width/2, 50);           
        }

        // draws "you loose page + score"
        if(state.current == state.over){
            ctx.font = "50px Teko";
            ctx.fillText("YOU LOST!!!", 62, 220);
            ctx.fillText("SCORE: " + this.score, 88, 280);
            ctx.font = "30px Teko";
            ctx.fillText("Press space to start over", 30, 480);
        }
    },

    reset : function(){
        this.score = 0;
    }
}

// Obstacles 
const obstacles = {

    // Array that keeps track of the obstacles
    obstaclesList : [],

    dX: canvas.width,
    dY: 1, 
    dy : 2.5,
    speed : 50,
    
    draw : function(){

        // draws one of the 3 obstacles based on the random number generated
        for(let i =0; i<this.obstaclesList.length; i++){

            let p = this.obstaclesList[i];

            if(p.obs == 1){
                ctx.drawImage(cone,p.x,this.dY + p.y , 120,105);
            }
            else if(p.obs == 2){
                ctx.drawImage(accident,p.x,this.dY + p.y , 237,105);
            }
            else if(p.obs == 3){
                ctx.drawImage(block,p.x,this.dY + p.y , 120,105);
            }          
        }
    },

    update : function(){

        if(state.current !== state.game) return;

        // adds an element to the list each 68 frames
        if(frames % 68 ==0 ) {

            // random number used to determine the position of the obstacle
            random = randomNumber(1,3); 
              
            this.obstaclesList.push({
                // random number used to determine which obstacle to display
                obs : randomNumber(1,3), 
                
                y: -80,

                // quadratic equation that generates the position based on the random number
                x: -97 + (92.5 * random) + (5.5 * random * random) 
            });                                   
        }
        
        for(let i =0; i<this.obstaclesList.length; i++){
            let p = this.obstaclesList[i];

            // moves the obstacle down the page
            p.y += this.dy;  
            
            // Collision detector of the cone
            if(p.obs == 1){
                if(p.x == 1){
                    if(racingCar.dX > -150 && racingCar.dX < 145 && p.y >=225 && p.y <=340 ){                       
                        state.current = state.over;
                        audio.play();                  
                    }
            }
                else if(p.x == 110){
                    if(racingCar.dX > 90 && racingCar.dX < 390 && p.y >=225 && p.y <=340 ){                        
                        state.current = state.over;
                        audio.play();
                     }
            }
                else if(p.x == 230){
                    if(racingCar.dX > 320 && racingCar.dX < 650 && p.y >=225 && p.y <=340 ){                       
                        state.current = state.over;
                        audio.play();
                     }
            }
        }
            // collision detector for the block
            if(p.obs == 3){
                if(p.x == 1){
                    if(racingCar.dX > -150 && racingCar.dX < 173 && p.y >=225 && p.y <=340 ){                           
                        state.current = state.over;
                        audio.play();                  
                     }
            }
                else if(p.x == 110){
                    if(racingCar.dX > 90 && racingCar.dX < 390 && p.y >=225 && p.y <=340 ){                           
                        state.current = state.over;
                        audio.play();
                    }
            }
                else if(p.x == 230){
                    if(racingCar.dX > 312 && racingCar.dX < 650 && p.y >=225 && p.y <=340 ){        
                         state.current = state.over;
                        audio.play();
                     }           
            }
         }
            // collision detector for the car accident
            if(p.obs == 2){
                if(p.x == 1){
                    if(racingCar.dX > -150 && racingCar.dX < 385 && p.y >=230 && p.y <=330 ){                       
                        state.current = state.over;
                        audio.play();              
                    }
        }
                else if(p.x == 110){
                     if(racingCar.dX > 90 && racingCar.dX < 700 && p.y >=235 && p.y <=330 ){                       
                        state.current = state.over;
                        audio.play();             
                    }
        }
                else if(p.x == 230){
                    if(racingCar.dX > 312 && racingCar.dX < 650 && p.y >=225 && p.y <=330 ){                       
                        state.current = state.over;
                        audio.play();                       
                }
             }
         }           
        
            // scoring algorithim
            if(p.y > 530){
                intro.score++;
                this.obstaclesList.shift();
            }
        }
    },

    reset : function(){
        this.obstaclesList = [];
    }
}

// white lines
const whiteLine = {

    // Arrays for white lines 
    positionLeft : [{y : 20}, {y : 120}, {y : 220}, {y : 320}, {y : 420}],
    positionRight : [{y : 20}, {y : 120}, {y : 220}, {y : 320}, {y : 420}], 

    sX : 1,
    sY : 1,
    dX: canvas.width,
    dY: 1,
    sH : 2000, 
    sW : 200, 
    dW : 20,
    dH: 70,
    gap : 30,
    dy : 2.5,
    speed : 50,


    draw : function(){ 
     
        // left lines
        for(let i =0; i<this.positionLeft.length; i++){
            let p = this.positionLeft[i];

            ctx.drawImage(white, this.sX, this.sY, this.sW, this.sH, this.dX/3 - this.dW/2, p.y + 0*this.dH + 0*this.gap, this.dW, this.dH);
        }

        // right lines
        for(let i =0; i<this.positionRight.length; i++){
            let p = this.positionRight[i];

            ctx.drawImage(white, this.sX, this.sY, this.sW, this.sH, 2*this.dX/3 - this.dW/2, p.y + 0*this.dH + 0*this.gap, this.dW, this.dH);
        }

    },

    update : function(){ // (Algorithim)

        if(state.current !==state.game) return;

        // adds a new white line to the element each "speed" frame
        if(frames%this.speed ==0) {
            this.positionLeft.push({y: -80});     
            this.positionRight.push({y: -80});          
        }

        //Moves the left lines to the back 
        for(let i =0; i<this.positionLeft.length; i++){
            let p = this.positionLeft[i];
            p.y += this.dy;            
        }
        //Moves the right lines to the back 
        for(let i =0; i<this.positionRight.length; i++){
            let p = this.positionRight[i];
            p.y += this.dy;    
        }
    },

    reset : function(){
        this.positionLeft = [{y : 20}, {y : 120}, {y : 220}, {y : 320}, {y : 420}];
        this.positionRight = [{y : 20}, {y : 120}, {y : 220}, {y : 320}, {y : 420}];
    }
}

//car
const racingCar = {

    dX: 240,
    dY: 300,
    
    // car speed
    dx:35 ,
    dy: 20,
   

    draw : function(){

        ctx.drawImage(car,this.dX/2 ,this.dY,100,100);
        
    },

    moveLeft : function(){

       this.dX -= this.dx;

        // moves the car to the other side of the canvas when gone outside one side of it
        if(this.dX <= -100){
            this.dX = canvas.width +150;
        }
        console.log("Car position is "+this.dX);
    },

    moveRight : function(){

        this.dX += this.dx;
       
        // moves the car to the other side of the canvas when gone outside one side of it
        if(this.dX >= canvas.width +250){
            this.dX = 1;
        }
        console.log("Car position is "+this.dX);
    },

    reset : function(){
        this.dX = 240;
    }    
}

// function that generates a random number // ABSTRACTION
function randomNumber(min, max) {
    random  =  Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
  }

// draw 
function draw(){
    ctx.fillStyle = "#232325";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    whiteLine.draw();
    obstacles.draw();
    racingCar.draw();
    intro.draw();    
}

// update
function update(){
    whiteLine.update();
    obstacles.update();
}

// Game function 
function game(){
    update();
    draw();
    frames++;
    requestAnimationFrame(game);
}

// PLAY GAME!
game();







