
var startCanvas = document.getElementById("start");
var startCtx = startCanvas.getContext("2d");
var menuCanvas = document.getElementById("menuHover");
var menuCtx = menuCanvas.getContext("2d");
var loseCanvas = document.getElementById("gameOver");;
var loseCtx = loseCanvas.getContext("2d");
startCanvas.width = 1070;
startCanvas.height = 1000;
var stageW = startCanvas.width;
var stageH = startCanvas.height;
var mouseX;
var mouseY;
var timeCount = 0;

var button = {
    x:600,
    y:570,
    width:370,
    height:54,
    x2:0,
    y2:0,
    points:[],
   // x2:x+width,
   // y2:y-height,
    //points:[{x,y},{x2,y},{x2,y2},{x,y2}]
}
var buttons = [];
var newGame = Object.create(button);
newGame.y2 = 516;
newGame.points = [{x:600,y:570},{x:970,y:570},{x:970,y:516},{x:600,y:516}];
buttons.push(newGame);

var tutoral = Object.create(button);
tutoral.y = 650;
tutoral.width = 310;
//tutoral.x2 = 600 + 310;
tutoral.y2 = 650 - 54;
tutoral.points = [{x:600,y:650},{x:600+310,y:650},{x:600+310,y:650-54},{x:600,y:650-54}];
buttons.push(tutoral);

var exit = Object.create(button);
exit.y = 730;
exit.width = 150;
//exit.x2 = 600 + 150;
exit.y2 = 730 - 54;
exit.points = [{x:600,y:730},{x:600+150,y:730},{x:600+150,y:730-54},{x:600,y:730-54}];
buttons.push(exit);

var buttonsText = ["NEW GAME", "TUTORAL", "EXIT"];
startCtx.font = "65px Russo One";
menuCtx.font = "65px Russo One";
menuCtx.fillStyle = "#006699";
startCtx.fillStyle = "#ffffff";

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

for(var i = 0; i < buttons.length; i++){
    //startCtx.textBaseline = "bottom"; 
    startCtx.fillText(buttonsText[i],buttons[i].x,buttons[i].y);
    var b = buttons[i];
    for(var j=0; j<b.points.length;j++)
        //var p = b.points[j];
    definePath(b.points);
    //menuCtx.stroke();
/*
    startCtx.strokeStyle = "red";
    startCtx.moveTo(buttons[i].x, buttons[i].y);
    startCtx.lineTo(buttons[i].x + buttons[i].width, buttons[i].y);
    startCtx.stroke();
*/
}

function definePath(p){
    menuCtx.beginPath();
    menuCtx.moveTo(p[0].x,p[0].y);
    for(var i=0;i<p.length;i++){
        menuCtx.lineTo(p[i].x,p[i].y);
    }
    menuCtx.closePath();
    //console.log(p);
}

menuCanvas.addEventListener("mousemove", checkPos);
menuCanvas.addEventListener("click", checkClick);

function checkPos(mouseEvent){
    mouseX = Math.floor((mouseEvent.offsetX/startCanvas.offsetWidth)*stageW);
    mouseY = Math.floor((mouseEvent.offsetY/startCanvas.offsetHeight)*stageH);
    
    var setCursor;
    var isHover;
    for(var i = 0; i < buttons.length; i++){
        var b = buttons[i];
        for(var j=0; j<b.points.length;j++){
            definePath(b.points); 
        }
        if(menuCtx.isPointInPath(mouseX,mouseY)){
            menuCtx.clearRect(b.x,b.y - b.height,b.width, b.height);
            menuCtx.fillText(buttonsText[i],b.x,b.y,);
            menuCtx.drawImage(arrowSign.image, (b.x-arrowSign.width-10), b.y2);
            setCursor = "pointer";
            isHover = true;
            break;
        }  
    }
    if(!setCursor && !isHover){
        menuCanvas.style.cursor = "default";  
        menuCtx.clearRect(0,0,stageW,stageH);           
      }else{
        menuCanvas.style.cursor = "pointer";              
      }
}

function checkClick(mouseEvent){
    mouseX = Math.floor((mouseEvent.offsetX/menuCanvas.offsetWidth)*stageW);
    mouseY = Math.floor((mouseEvent.offsetY/menuCanvas.offsetHeight)*stageH);
    for(i = 0; i < buttons.length; i++){
        var btn = buttons[i];
        if(mouseX > btn.x && mouseX < btn.x + btn.width){
            if(mouseY < btn.y && mouseY > btn.y - btn.height){
               // menuCtx.clearRect(btn.x,btn.y - btn.height,btn.width, btn.height);
                //menuCtx.fillText(buttonsText[i],btn.x,btn.y,);  
                    switch(i)
                    {
                        case 0:
                            if( paused == true ){
                                paused = false;
                            }	else	
                                paused = false;
                            timeCount = setInterval(timer, 1000);
                            createjs.Ticker.addEventListener("tick", update);
                            uiFrame.style.display = "block";
                            game.style.display ="block";
                            startCanvas.style.display = "none";
                            menuCanvas.style.display = "none";
                            //loseCanvas.style.display = "none";
                        break;
                        case 1:
                            
                        break;
                        case 2:
                            
                        break;
                    }
            }
        }
    }
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

function newGame(){
    uiFrame.style.display = "block";
    game.style.display = "block";
    menuCanvas.style.display = "none";
    startCanvas.style.display = "none";
    createjs.Ticker.addEventListener("tick", update);
  
    if( paused == true ){
      paused = false;
    }	else	
      paused = false;

}

function gameOver(){

    if( paused == false ){
        paused = true;
        loseCtx.drawImage(crashImage, 130, 100);
        clearInterval(timeCount);
        //scoreCtx.clearRect(0,0,scoreCanvas.width,scoreCanvas.height);
      }	else	
        paused = false;
} 

/*
  startCtx.beginPath();
                        startCtx.moveTo(btn.x,btn.y);
                        startCtx.lineTo(btn.x+btn.width,btn.y);
                        startCtx.lineTo(btn.x+btn.width,btn.y-btn.height);
                        startCtx.lineTo(btn.x,btn.y-btn.height)
                        startCtx.closePath();
                        startCtx.stroke();
                        
*/

//game over menu crash

var crashImage = new Image();
crashImage.addEventListener("load", loadHandler, false);
crashImage.src = "Assets/images/endScreen_crash.png";