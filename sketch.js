var balloon,balloonImage1,balloonImage2;
var database,position;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);

 var  balloonPosition = database.ref('ballon/height');
      balloonPosition.on("value",readHeight,showError);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updatePosition(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction


  }


  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updatePosition(x,y){
  database.ref('ballon/height').set({
    'x' : height.x + x,
    'y' : height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}