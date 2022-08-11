
var jumpSound = new Audio("jumping.wav");
var slideSound = new Audio("woosh.mp3")
var runSound = new Audio("santasound.mp3");
var deadSound = new Audio("deadsound.wav");


function KeyCheck(event){

    var KeyCode = event.which;

    if(KeyCode == 13){
        //Enter - Start the game - RUN

        document.getElementById("startGame").style.visibility = "hidden";
        document.getElementById("background").style.visibility = "visible";
        clearInterval(santaIdleWorkerNumber);

        if(santaRunWorkerNumber == 0){
            santaRunWorkerNumber = setInterval(santaRunAnimaton,80);
        }

        if(backgroundWorkerNumber == 0){
            backgroundWorkerNumber = setInterval(backgroundMove,80);
        }

        if(groundBoxWorker == 0){
            groundBoxWorker = setInterval(moveGroundBox,100);
        }

        if(airBoxWorker == 0){
            airBoxWorker = setInterval(moveAirBox,100);
        }

        runSound.play();
        jumpSound.pause();
        slideSound.pause();
        deadSound.pause();


    }

    if(KeyCode == 38){
        //ArrowUp - to JUMP

        document.getElementById("startGame").style.visibility = "hidden";

        if(santaJumpWorkerNumber == 0){

            clearInterval(santaRunWorkerNumber);
            clearInterval(santaSlideWorkerNumber);
            clearInterval(santaIdleWorkerNumber);
            santaJumpWorkerNumber = setInterval(santaJumpAnimation,80);

            runSound.pause();
            jumpSound.play();
            slideSound.pause();
            deadSound.pause();
        }
    }

    if(KeyCode == 40){
        //ArrowDown - to Slide

        document.getElementById("startGame").style.visibility = "hidden";

        if(santaSlideWorkerNumber == 0){

            clearInterval(santaRunWorkerNumber);
            clearInterval(santaJumpWorkerNumber);
            clearInterval(santaIdleWorkerNumber);
            santaSlideWorkerNumber = setInterval(santaSlideAnimation,80);

            
            runSound.pause();
            jumpSound.pause();
            slideSound.play();
            deadSound.pause();

        }
    }


}

var santaRunImageNumber = 1;
var santaRunWorkerNumber = 0;

function santaRunAnimaton(){
    santaRunImageNumber  = santaRunImageNumber + 1;

    if(santaRunImageNumber == 12){
        santaRunImageNumber = 1;
    }

    document.getElementById("santa").src = "santa/Run (" +santaRunImageNumber+ ").png";

    runSound.play();

}

var santaJumpImageNumber = 1;
var santaJumpWorkerNumber = 0;
var santaMarginTop = 430;

function santaJumpAnimation(){

    santaJumpImageNumber = santaJumpImageNumber + 1;

    if(santaJumpImageNumber <= 8){
        santaMarginTop = santaMarginTop - 12.8572;
        document.getElementById("santa").style.marginTop = santaMarginTop + "px";
    }

    if(santaJumpImageNumber >=9){
        santaMarginTop = santaMarginTop + 10;
        document.getElementById("santa").style.marginTop = santaMarginTop + "px";
    }
    

    if(santaJumpImageNumber == 17){
        clearInterval(santaJumpWorkerNumber);
        santaJumpWorkerNumber = 0;
        santaJumpImageNumber = 1;

        santaRunWorkerNumber = setInterval(santaRunAnimaton,80);

        if(backgroundWorkerNumber ==0){
            backgroundWorkerNumber = setInterval(backgroundMove,100);
        }

        if(groundBoxWorker == 0){
            groundBoxWorker = setInterval(moveGroundBox,100);
        }

        if(airBoxWorker == 0){
            airBoxWorker = setInterval(moveAirBox,100);

        }
    }

    document.getElementById("santa").src = "santa/Jump (" +santaJumpImageNumber+ ").png";

}

var santaSlideImageNumber = 1;
var santaSlideWorkerNumber = 0;

function santaSlideAnimation(){

    santaSlideImageNumber = santaSlideImageNumber + 1;

    if(santaSlideImageNumber <= 6){
        santaMarginTop = santaMarginTop + 12.5;
        document.getElementById("santa").style.marginTop = santaMarginTop + "px";
    }

    if(santaSlideImageNumber >= 7){
        santaMarginTop = santaMarginTop - 10.4166;
        document.getElementById("santa").style.marginTop = santaMarginTop + "px";
    }

    if(santaSlideImageNumber == 12){
        clearInterval(santaSlideWorkerNumber);
        santaSlideWorkerNumber = 0;
        santaSlideImageNumber = 1;

        santaRunWorkerNumber = setInterval(santaRunAnimaton,80);

        if(backgroundWorkerNumber ==0){
            backgroundWorkerNumber = setInterval(backgroundMove,100);
        }

        if(groundBoxWorker == 0){
            groundBoxWorker = setInterval(moveGroundBox,100);
        }

        if(airBoxWorker == 0){
            airBoxWorker = setInterval(moveAirBox,100);

        }
    }

    document.getElementById("santa").src = "santa/Slide (" +santaSlideImageNumber+ ").png";
    
}

var backgroundMarginLeft = 0;
var backgroundWorkerNumber = 0;
var santaMarginLeft = 0;

var score = 0;
var winsound = new Audio("crowdcheer.mp3");

function backgroundMove(){

    backgroundMarginLeft = backgroundMarginLeft - 20;

    document.getElementById("background").style.backgroundPositionX = backgroundMarginLeft + "px";

    score = score + 1;
    document.getElementById("score").innerHTML = score;

    if(score >= 640){
        document.getElementById("youwon").style.visibility = "visible";
        winsound.play();
        runSound.pause();
        clearInterval(backgroundWorkerNumber);
        clearInterval(santaRunWorkerNumber);
        santaIdleWorkerNumber = setInterval(santaIdleAnimation,80);
    }
}

var groundBoxWorker = 0;
var groundboxMarginLeft = 50;

function createGroundBox(){

    for(var i = 0; i < 1; i++){
        var groundbox = document.createElement("div");
        groundbox.className = "groundbox";
        groundbox.id = "groundbox" + i;

        // groundboxMarginLeft = groundboxMarginLeft + 1000;

        if(i <= 7){ //adding levels
            groundboxMarginLeft = groundboxMarginLeft + 1000
        }

        if (i >= 8){
            groundboxMarginLeft = groundboxMarginLeft + 700
        }

        groundbox.style.marginLeft = groundboxMarginLeft + "px";
        document.getElementById("background").appendChild(groundbox);

    }

}

function moveGroundBox(){

    for(var i = 0; i < 1; i++){
        var groundbox = document.getElementById("groundbox" + i);
        var currentgroundboxMarginLeft = getComputedStyle(groundbox).marginLeft;
        var newgroundboxMarginLeft = parseInt(currentgroundboxMarginLeft) - 20;
        groundbox.style.marginLeft = newgroundboxMarginLeft + "px";

        // alert(newgroundboxMarginLeft);

        if(newgroundboxMarginLeft >=40 & newgroundboxMarginLeft <=140){

            if(santaMarginTop >= 380){

                clearInterval(groundBoxWorker);
                groundBoxWorker = -1;
                clearInterval(airBoxWorker);
                airBoxWorker = -1;

                clearInterval(backgroundWorkerNumber);
                backgroundWorkerNumber = -1;

                clearInterval(santaRunWorkerNumber);
                santaRunWorkerNumber = -1;

                clearInterval(santaJumpWorkerNumber);
                santaJumpWorkerNumber = -1;

                clearInterval(santaSlideWorkerNumber);
                santaSlideWorkerNumber = -1;

                clearInterval(santaIdleWorkerNumber);
                santaIdleWorkerNumber = -1;

                santaDeadWorkerNumber = setInterval(santaDeadAnimation,80);

                deadSound.play();
                runSound.pause();
                jumpSound.pause();
                slideSound.pause();

            }
            
        }
    }

}

var airBoxWorker = 0;
var airboxMarginLeft = 2500;

function createAirBox(){

    for(var i = 0; i < 9; i++){
        var airbox = document.createElement("div");
        airbox.className = "airbox";
        airbox.id = "airbox" + i;

        // airboxMarginLeft = airboxMarginLeft + 1000;
        if(i <= 6){//adding levels
            airboxMarginLeft = airboxMarginLeft + 950
        }

        if(i >= 7){
            airboxMarginLeft = airboxMarginLeft + 500
        }
        airbox.style.marginLeft = airboxMarginLeft + "px";
        document.getElementById("background").appendChild(airbox);

        

    }

}

function moveAirBox(){

    for(var i = 0; i < 9; i++){
        var airbox = document.getElementById("airbox" + i);
        var currentairboxMarginLeft = getComputedStyle(airbox).marginLeft;
        var newairboxMarginLeft = parseInt(currentairboxMarginLeft) - 20;
        airbox.style.marginLeft = newairboxMarginLeft + "px";

        // alert(newairboxMarginLeft);

        if(newairboxMarginLeft >=60 & newairboxMarginLeft <=140){

            if(santaMarginTop <= 435){

                clearInterval(groundBoxWorker);
                groundBoxWorker = -1;
                clearInterval(airBoxWorker);
                airBoxWorker = -1;

                clearInterval(backgroundWorkerNumber);
                backgroundWorkerNumber = -1;

                clearInterval(santaRunWorkerNumber);
                santaRunWorkerNumber = -1;

                clearInterval(santaJumpWorkerNumber);
                santaJumpWorkerNumber = -1;

                clearInterval(santaSlideWorkerNumber);
                santaSlideWorkerNumber = -1;

                clearInterval(santaIdleWorkerNumber);
                santaIdleWorkerNumber = -1;

                santaDeadWorkerNumber = setInterval(santaDeadAnimation,80);

                deadSound.play();
                runSound.pause();
                jumpSound.pause();
                slideSound.pause();

                
            }
            
        }
    }

}

var santaDeadImageNumber = 1;
var santaDeadWorkerNumber = 0;

function santaDeadAnimation(){

    santaDeadImageNumber = santaDeadImageNumber + 1;

    if(santaDeadImageNumber == 18){
        santaDeadImageNumber = 17;

        clearInterval(santaDeadWorkerNumber);
        clearInterval(santaIdleWorkerNumber);

        document.getElementById("santa").style.marginTop = "430px";
        document.getElementById("endGame").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
    }

    document.getElementById("santa").src = "santa/Dead (" +santaDeadImageNumber+ ").png";


}

var santaIdleImageNumber = 1;
var santaIdleWorkerNumber = 0;

function santaIdleAnimation(start){
    santaIdleImageNumber  = santaIdleImageNumber + 1;

    if(santaIdleImageNumber == 17){
        santaIdleImageNumber = 1;
    }

    document.getElementById("santa").src = "santa/Idle (" +santaIdleImageNumber+ ").png";

}

santaIdleWorkerNumber = setInterval(santaIdleAnimation,100);




function newGame(){
    location.reload();
}



