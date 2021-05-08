var balloon,balloonImage1,balloonImage2;
var database, position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPos = database.ref('Balloon/position');
  balloonPos.on("value", readPosition, showError);
  textSize(20); 
}


function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updatePosition(-10, 0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);

  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10, 0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);

  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0, -10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0, 10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale + 0.01;
  }


  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text(" → Use arrow keys to move Hot Air Balloon!",40,40);
}

function updatePosition(x,y){
  database.ref('Balloon/position').set({
    'x' : position.x + x,
    'y' : position.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;

}

function showError(){
  console.log("ERROR !!");
}
