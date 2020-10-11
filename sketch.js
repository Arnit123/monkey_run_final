
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime=0;
var PLAY = 0,END=1,gameState = PLAY
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  monkey_standing = loadImage("sprite_0.png");
}



function setup() {
  createCanvas(400,400);

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.1;

  ground = createSprite(400,350,1000,10);
  ground.velocityX = -5;
  ground.x = ground.width/2;
  
 obstacleGroup = new Group();
  
  bananaGroup = new Group();
  
}


function draw() {
background("white");
  
 
  monkey.velocityY=monkey.velocityY+0.3;
  
  monkey.collide(ground);
  
  
  if(ground.x>0){
  ground.x = 400
  }
  
  if(gameState===PLAY){
     if(keyDown("space")&&monkey.y >=310){               
    monkey.velocityY = -10
  }
    spawnBanana();
    spawnObstacles();
if(obstacleGroup.isTouching(monkey)){
 gameState = END
   
  }
}

  
  else if(gameState === END){
    ground.x = 0;
    monkey.velocityX =  (0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  //  monkey.changeAnimation("monkey_standing")
    
  }
  
  text("Survival Time:"+survivalTime,280,20)
  survivalTime = Math.round(frameCount/30)
  
 // monkey.collide(obstacle);
  drawSprites();
  


}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   obstacle = createSprite(370,330,30,30);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
   obstacle.lifetime = 400;
   obstacle.velocityX = -(8 + survivalTime/100);
 obstacleGroup.add(obstacle)
 }
}

function spawnBanana() {
  
  if (frameCount % 60 === 0) {
  banana = createSprite(350,200,20,20);
  banana.y = Math.round(random(180,220));  
  banana.addImage(bananaImage);
  banana.scale = 0.08
  banana.velocityX = -5
  
    banana.lifetime = 400;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
  }
}