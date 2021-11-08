  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var invisibleGround;
var score = 0;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  invisibleGround = createSprite(300,590,600,20);
  invisibleGround.visible = false;

  
  
}


function draw() {
  background("black");
  
  if (gameState === "play") {
    
    if(keyDown("left")){
      ghost.x= ghost.x-3;  
      // write a code to move left when left arrow is pressed
    }
    if(keyDown("right")){

      ghost.x= ghost.x+3;    
      // write a code to move left when right arrow is pressed
      
    }
    if(keyDown("space")){
      ghost.velocityY = -5;  
   
      // write a code to move up when space arrow is pressed
      
    }

    ghost.collide(invisibleGround);
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   
      //write a condition for infinte scrolling tower
      if (tower.y>400) {
        tower.y = 300;
      }
    
      spawnDoors();
      if (climbersGroup.isTouching(ghost)) {
        ghost.velocityY = 0;
        score = score+1;
       
      }
      

  
      //write a code to make climbersGroup collide with ghost change the ghost velocity  
//write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
      if (invisibleBlockGroup.isTouching(ghost)) {
        gameState = "end";
        ghost.destroy();
      }


  
  drawSprites();
  text("Score: "+ score,50,100);
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10,40,10);
    var invisibleBlock = createSprite(200,20);
    climber.scale = 0.2;
  door.scale = 0.2;
    invisibleBlock.width = climber.width;
    
    invisibleBlock.height = 2;
    climber.setCollider("circle",0,0,40);
    //climber.debug = true;
    //add the random function
    //
    door.x = Math.round(random(100,450));
    climber.x = door.x;
    invisibleBlock.x = climber.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //change the depth of the ghost and door
    ghost.depth = door.depth;
    ghost.depth = climber.depth;
    ghost.depth = invisibleBlock.depth;
    ghost.depth = ghost.depth+1;
     

    
    //assign lifetime to the obstacle.lifetime = 300; here  obstacle are door, climber and invisible block
    door.lifetime = 800,
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
  }
}

