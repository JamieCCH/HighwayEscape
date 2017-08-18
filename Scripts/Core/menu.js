var startCanvas = document.getElementById("start");
var startCtx = startCanvas.getContext("2d");
startCanvas.width = 1070;
startCanvas.height = 1000;
var helpCanvas = document.getElementById("help");
var helpCtx = helpCanvas.getContext("2d");
var menuCanvas = document.getElementById("menuHover");
var menuCtx = menuCanvas.getContext("2d");
var loseCanvas = document.getElementById("gameOver");;
var loseCtx = loseCanvas.getContext("2d");
var overCanvas = document.getElementById("gameOverMenu");;
var overCtx = overCanvas.getContext("2d");
var tutorGameCanvas = document.getElementById("tutoral");;
var tutoralCtx = tutorGameCanvas.getContext("2d");
var tutorMsgCanvas = document.getElementById("tutorMsg");;
var msgCtx = tutorMsgCanvas.getContext("2d");
var tutorMaskCanvas = document.getElementById("tutorMask");
var MaskCtx = tutorMaskCanvas.getContext("2d");
var gameCanvas = document.getElementById("game");
var gameCtx = gameCanvas.getContext("2d");
var uiCanvas = document.getElementById("uiFrame");
var uiCtx = uiCanvas.getContext("2d");
var muteBtCanvas = document.getElementById("forBtn");
var muteBtCtx = muteBtCanvas.getContext("2d");

var stageW = startCanvas.width;
var stageH = startCanvas.height;
var mouseX;
var mouseY;
var timeCount = 0;

var musicOn = true;

var button = {
    x:600,
    y:570,
    width:370,
    height:54,
    x2:0,
    y2:0,
    points:[],
    //x2:x+width,
    //y2:y-height,
    //points:[{x,y},{x2,y},{x2,y2},{x,y2}]
}
var buttons = [];
var newGame = Object.create(button);
newGame.y2 = 516;
newGame.points = [{x:600,y:570},{x:970,y:570},{x:970,y:516},{x:600,y:516}];
buttons.push(newGame);

var tutoral = Object.create(button);
tutoral.y = 650;
tutoral.width = 180;
//tutoral.x2 = 600 + 310;
tutoral.y2 = 650 - 54;
tutoral.points = [{x:600,y:650},{x:600+180,y:650},{x:600+180,y:650-54},{x:600,y:650-54}];
buttons.push(tutoral);

var exit = Object.create(button);
exit.y = 730;
exit.width = 150;
//exit.x2 = 600 + 150;
exit.y2 = 730 - 54;
exit.points = [{x:600,y:730},{x:600+150,y:730},{x:600+150,y:730-54},{x:600,y:730-54}];
buttons.push(exit);

var muteBt = Object.create(button);
muteBt.x = 980;
muteBt.y = 930;
muteBt.width = 81;
muteBt.height = 76;
muteBt.x2 = 1061;
muteBt.y2 = 1006;
muteBt.points=[{x:980,y:930},{x:980+81,y:930},{x:980+81,y:930+76},{x:980,y:930+76}];
muteBt.image = new Image();
muteBt.image.addEventListener("load", loadHandler, false);
muteBt.image.src = "Assets/images/bt_mute.png";

var gameMuteBt = new Object(); 
gameMuteBt.points=[{x:990,y:100},{x:990+81,y:100},{x:990+81,y:100+76},{x:990,y:100+76}];

var buttonsText = ["NEW GAME", "HELP", "EXIT"];

var arrowSign = {
    x:0,
    y:0,
    width:90,
    height:54,
    image:null,
}
arrowSign.image = new Image();
arrowSign.image.addEventListener("load", loadHandler, false);
arrowSign.image.src = "Assets/images/icon_arrowSign.png";

menuCanvas.addEventListener("mousemove", checkPos);
menuCanvas.addEventListener("click", checkClick);
muteBtCanvas.addEventListener("mousemove", muteBtOver);
muteBtCanvas.addEventListener("click", muteBtClick);
helpCanvas.addEventListener("mousemove",backBtnOver);
helpCanvas.addEventListener("click",backBtClick);

function loadMenu(){
    //muteBtCtx.drawImage(muteBt.image,990,100);
    startCtx.drawImage(muteBt.image,muteBt.x,muteBt.y);
    for(var i = 0; i < buttons.length; i++){
        startCtx.font = "65px RussoOne";
        startCtx.fillStyle = "#ffffff";
        startCtx.fillText(buttonsText[i],buttons[i].x,buttons[i].y);
        var b = buttons[i];
        for(var j=0; j<b.points.length;j++)
        definePath(b.points);
    /*
        startCtx.strokeStyle = "red";
        startCtx.moveTo(buttons[i].x, buttons[i].y);
        startCtx.lineTo(buttons[i].x + buttons[i].width, buttons[i].y);
        startCtx.stroke();
    */
    }
}

function definePath(p){
    menuCtx.beginPath();
    menuCtx.moveTo(p[0].x,p[0].y);
    for(var i=0;i<p.length;i++){
        menuCtx.lineTo(p[i].x,p[i].y);
    }
    menuCtx.closePath();
    //menuCtx.stroke();
    //console.log(p);
}


function muteBtOver(mouseEvent){

    mouseX = Math.floor((mouseEvent.offsetX/muteBtCanvas.offsetWidth)*stageW);
    mouseY = Math.floor((mouseEvent.offsetY/muteBtCanvas.offsetHeight)*stageH);

    var setCursor;
    var isHover = false;

    muteBtCtx.beginPath();
    muteBtCtx.moveTo(gameMuteBt.points[0].x,gameMuteBt.points[0].y);
    for(var i=0;i<gameMuteBt.points.length;i++){
        muteBtCtx.lineTo(gameMuteBt.points[i].x,gameMuteBt.points[i].y);
    }
    muteBtCtx.closePath();
    
    if(muteBtCtx.isPointInPath(mouseX,mouseY)){
        setCursor = "pointer";
        isHover = true;
    }

    if(!setCursor && !isHover){
        muteBtCanvas.style.cursor = "default";   
    }else{
        isHover = true;
        muteBtCanvas.style.cursor = "pointer";           
    }

}

function muteBtClick(mouseEvent){

    mouseX = Math.floor((mouseEvent.offsetX/muteBtCanvas.offsetWidth)*stageW);
    mouseY = Math.floor((mouseEvent.offsetY/muteBtCanvas.offsetHeight)*stageH);

    var setCursor;
    var isHover = false;

    muteBtCtx.beginPath();
    muteBtCtx.moveTo(gameMuteBt.points[0].x,gameMuteBt.points[0].y);
    for(var i=0;i<gameMuteBt.points.length;i++){
        muteBtCtx.lineTo(gameMuteBt.points[i].x,gameMuteBt.points[i].y);
    }
    muteBtCtx.closePath();
    
    if(muteBtCtx.isPointInPath(mouseX,mouseY)){
        if(musicOn){
            musicOn = false;
            menuMusic.stop();
            carIdle.stop();
        }else{
            musicOn = true;
            menuMusic.play(); 
            carIdle.play();
        }
    }
}


function checkPos(mouseEvent){
    mouseX = Math.floor((mouseEvent.offsetX/startCanvas.offsetWidth)*stageW);
    mouseY = Math.floor((mouseEvent.offsetY/startCanvas.offsetHeight)*stageH);
    
    var setCursor;
    var isHover = false;

    startCtx.beginPath();
    startCtx.moveTo(muteBt.points[0].x,muteBt.points[0].y);
    for(var i=0;i<muteBt.points.length;i++){
        startCtx.lineTo(muteBt.points[i].x,muteBt.points[i].y);
    }
    startCtx.closePath();

    if(startCtx.isPointInPath(mouseX,mouseY)){
        setCursor = "pointer";
        isHover = true;
    }

    for(var i = 0; i < buttons.length; i++){
        var b = buttons[i];
        for(var j=0; j<b.points.length;j++){
            definePath(b.points); 
        }
        if(menuCtx.isPointInPath(mouseX,mouseY)){
            menuCtx.clearRect(b.x,b.y - b.height,b.width, b.height);
            menuCtx.font = "65px RussoOne";
            menuCtx.fillStyle = "#006699";
            menuCtx.fillText(buttonsText[i],b.x,b.y,);
            menuCtx.drawImage(arrowSign.image, (b.x-arrowSign.width-10), b.y2);
            setCursor = "pointer";
            isHover = true;
            btSound.play();
        }
    }
    if(!setCursor && !isHover){
        menuCanvas.style.cursor = "default";  
        muteBtCanvas.style.cursor = "default";
        menuCtx.clearRect(0,0,stageW,stageH);     
    }else{
        isHover = true;
        menuCanvas.style.cursor = "pointer"; 
        //muteBtCanvas.style.cursor = "pointer";           
    }
}


function checkClick(mouseEvent){
    mouseX = Math.floor((mouseEvent.offsetX/menuCanvas.offsetWidth)*stageW);
    mouseY = Math.floor((mouseEvent.offsetY/menuCanvas.offsetHeight)*stageH);

    startCtx.beginPath();
    startCtx.moveTo(muteBt.points[0].x,muteBt.points[0].y);
    for(var i=0;i<muteBt.points.length;i++){
        startCtx.lineTo(muteBt.points[i].x,muteBt.points[i].y);
    }
    startCtx.closePath();
    
    if(startCtx.isPointInPath(mouseX,mouseY)){
        if(musicOn){
            musicOn = false;
            menuMusic.stop();
            carIdle.stop();
        }else{
            musicOn = true;
            menuMusic.play(); 
            carIdle.play();
        }
        console.log(musicOn);
    }


    for(i = 0; i < buttons.length; i++){
        var btn = buttons[i];
        if(mouseX > btn.x && mouseX < btn.x + btn.width){
            if(mouseY < btn.y && mouseY > btn.y - btn.height){
               // menuCtx.clearRect(btn.x,btn.y - btn.height,btn.width, btn.height);
                //menuCtx.fillText(buttonsText[i],btn.x,btn.y,);  
                    switch(i)
                    {
                        case 0:
                            startGame();
                        break;
                        case 1:
                            helpScreen();
                        break;
                        case 2:
                            self.close();
                        break;
                    }
            }
        }
    }
} 

function backBtnOver(mouseEvent){

    mouseX = Math.floor((mouseEvent.offsetX/helpCanvas.offsetWidth)*stageW);
    mouseY = Math.floor((mouseEvent.offsetY/helpCanvas.offsetHeight)*stageH);

    var setCursor;
    var isHover = false;

    helpCtx.beginPath();
    helpCtx.moveTo(900,900);
    helpCtx.lineTo(900+174,900);
    helpCtx.lineTo(900+174,900+99);
    helpCtx.lineTo(900,900+99);
    helpCtx.closePath();
    //helpCtx.stroke();
    
    if(helpCtx.isPointInPath(mouseX,mouseY)){
        setCursor = "pointer";
        isHover = true;
        btSound.play();
    }

    if(!setCursor && !isHover){
        helpCanvas.style.cursor = "default";   
    }else{
        isHover = true;
        helpCanvas.style.cursor = "pointer";           
    }
}

function backBtClick(mouseEvent){
    
    mouseX = Math.floor((mouseEvent.offsetX/helpCanvas.offsetWidth)*stageW);
    mouseY = Math.floor((mouseEvent.offsetY/helpCanvas.offsetHeight)*stageH);
    var setCursor;
    var isHover = false;
    
    helpCtx.beginPath();
    helpCtx.moveTo(900,900);
    helpCtx.lineTo(900+174,900);
    helpCtx.lineTo(900+174,900+99);
    helpCtx.lineTo(900,900+99);
    helpCtx.closePath();
    //helpCtx.stroke();
        
    if(helpCtx.isPointInPath(mouseX,mouseY)){
        helpCanvas.style.display = "none";
    }
}

function helpScreen(){
    helpCanvas.style.display = "block";
    helpCtx.drawImage(backImg,900,900);
}

function startGame(){
    if( paused == true ){
        paused = false;
    }	else	
        paused = false;
    timeCount = setInterval(timer, 1000);
    muteBtCanvas.style.display = "block";
    uiFrame.style.display = "block";
    game.style.display = "block";
    menuCanvas.style.display = "none";
    startCanvas.style.display = "none";
    createjs.Ticker.addEventListener("tick", update);
    muteBtCtx.drawImage(muteBt.image,990,100);
    carIdle.play();
}


/*
function checkClick(mouseEvent){
     mouseX = Math.floor((mouseEvent.offsetX/startCanvas.offsetWidth)*stageW);
     mouseY = Math.floor((mouseEvent.offsetY/startCanvas.offsetHeight)*stageH);
 
     for(var i = 0; i < buttons.length; i++){
         var b = buttons[i];
         for(var j=0; j<b.points.length;j++){
             definePath(b.points); 
         }
         if(menuCtx.isPointInPath(mouseX,mouseY)){
            switch(i){
                case 0:
                 newGame(); 
                break;
            }
         }  
     }
 }
*/



/*
  startCtx.beginPath();
                        startCtx.moveTo(btn.x,btn.y);
                        startCtx.lineTo(btn.x+btn.width,btn.y);
                        startCtx.lineTo(btn.x+btn.width,btn.y-btn.height);
                        startCtx.lineTo(btn.x,btn.y-btn.height)
                        startCtx.closePath();
                        startCtx.stroke();
                        
*/

//--------------------------
//game over menu (crash)
//--------------------------
var crashImage = new Image();
crashImage.addEventListener("load", loadHandler, false);
crashImage.src = "Assets/images/endScreen_crash.png";

var backImg = new Image();
backImg.addEventListener("load", loadHandler, false);
backImg.src = "Assets/images/bt_back.png";

var endBtn = {
    x:300,
    y:725,
    width:397,
    height:55,
    x2:0,
    y2:0,
    points:[],
}
var endBtns = [];
var newGameYellow = Object.create(endBtn);
newGameYellow.y2 = 725-55;
newGameYellow.points = [{x:300,y:725},{x:300+397,y:725},{x:300+397,y:725-55},{x:300,y:725-55}];
endBtns.push(newGameYellow);

var exitYellow = Object.create(endBtn);
exitYellow.y = 825;
exitYellow.width = 160;
exitYellow.y2 = 825 - 55;
exitYellow.points = [{x:300,y:825},{x:300+160,y:825},{x:300+160,y:825-55},{x:300,y:825-55}];
endBtns.push(exitYellow);

var endBtnsTxt = ["NEW GAME", "EXIT"];

var yellowArrow = {
    x:0,
    y:0,
    width:111,
    height:52,
}
yellowArrow.image = new Image();
yellowArrow.image.addEventListener("load", loadHandler, false);
yellowArrow.image.src = "Assets/images/icon_yellowArrow.png";

overCanvas.addEventListener("mousemove", moveYellowAr);
overCanvas.addEventListener("mousedown", clickBt);

function gameOver(){
    loadbtn();
    loseCanvas.style.display = "block";
    overCanvas.style.display = "block";
    loseCtx.drawImage(crashImage, 130, 100);
    clearInterval(timeCount);

    if(paused == false)
        paused = true;
    else	
        paused = true;

}

function loadbtn(){
    console.log("loadbtn");
    for(var i = 0; i < endBtns.length; i++){
        loseCtx.font = "68px RussoOne";
        loseCtx.fillStyle = '#ffffff';
        loseCtx.fillText(endBtnsTxt[i], endBtns[i].x, endBtns[i].y);
        var b = endBtns[i];
        for(var j=0; j<b.points.length;j++)
            dieBtnPath(b.points);
    }
}

function dieBtnPath(p){
    overCtx.beginPath();
    overCtx.moveTo(p[0].x,p[0].y);
    for(var i=0;i<p.length;i++){
        overCtx.lineTo(p[i].x,p[i].y);
    }
    overCtx.closePath();
   // overCtx.stroke();
}

function moveYellowAr(mouseEvent){
    mouseX = Math.floor((mouseEvent.offsetX/overCanvas.offsetWidth)*stageW);
    mouseY = Math.floor((mouseEvent.offsetY/overCanvas.offsetHeight)*stageH);
    var setCursor;
    var isHover;
    //console.log("moveYellowAr");

    for(var i = 0; i < endBtns.length; i++){
        var b = endBtns[i];
        for(var j=0; j< b.points.length; j++){
            dieBtnPath(b.points);        
            if(overCtx.isPointInPath(mouseX,mouseY)){
                overCtx.font = "68px RussoOne";
                overCtx.fillStyle = '#D6881F';
                overCtx.fillText(endBtnsTxt[i], endBtns[i].x, endBtns[i].y);
                overCtx.drawImage(yellowArrow.image, endBtns[i].x - yellowArrow.width - 10, endBtns[i].y - yellowArrow.height);
                setCursor = "pointer";
                isHover = true;
                btSound.play();
                //console.log("isPointInPath");
                break;
            }
        }
    }
    if(!setCursor && !isHover){
        overCanvas.style.cursor = "default";  
        overCtx.clearRect(0,0,stageW,stageH);           
      }else{
        overCanvas.style.cursor = "pointer";              
      }
}

function clickBt(mouseEvent)
{
    mouseX = Math.floor((mouseEvent.offsetX/overCanvas.offsetWidth)*stageW);
    mouseY = Math.floor((mouseEvent.offsetY/overCanvas.offsetHeight)*stageH);
    
    for(var i = 0; i < endBtns.length; i++){
        var b = endBtns[i];
        for(var j=0; j< b.points.length; j++){
            dieBtnPath(b.points);        
            if(overCtx.isPointInPath(mouseX,mouseY)){
                switch(i)
                {
                    case 0:
                        location.reload();
                    break;
                    case 1:
                        self.close();
                    break;
                }
            }
        }
    }

 }