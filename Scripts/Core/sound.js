
var btSound;
btSound = new sound("Assets/sound/menu-selection-click.wav");
var menuMusic;
menuMusic = new sound("Assets/sound/menu.mp3");
//var menuMusic = document.getElementById("bgMusic");
var pickupSoud;
pickupSoud = new sound("Assets/sound/pick_up.mp3");
var coinSoud;
coinSoud = new sound("Assets/sound/coin-pickup.wav");
var carHit;
carHit = new sound("Assets/sound/carHit.mp3");
var carIdle
carIdle = new sound("Assets/sound/carIdle.mp3");
//var carIdle = document.getElementById("carRun");

initGameSound();

function initGameSound() {
  menuMusic.play();
  //document.getElementById("bgMusic").play();
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  }
  this.stop = function(){
      this.sound.pause();
  }    
}
