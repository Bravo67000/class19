var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
 
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale=0.3
  ghost.debug=true
  ghost.setCollider("rectangle",0,0,20,30)


  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  spookySound.loop()
}

function draw() {
  background(255,0,0);


  if(gameState =="play"){
  if(tower.y > 500){
      tower.y = 400
    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x-2
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x+2
    }
    if(keyDown("space")){
      ghost.velocityY = -3
     
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy()
      gameState="end"
    }

    ghost.velocityY=ghost.velocityY+0.8
 
 
   ghost.collide(climbersGroup)

  
    spawnDoors();
    drawSprites()

  }
  
 

  if(gameState =="end"){
    textSize(30)
    fill("white")
    text("GAME OVER",300,300)

  }
   

    
}
function spawnDoors(){
  if(frameCount%200==0){
    door=createSprite(Math.round(random(100,500)),0,10,10)
    door.addImage(doorImg)
    door.velocityY=1
    door.lifetime=600
    doorsGroup.add(door)

    door.depth = ghost.depth
    ghost.depth = ghost.depth+1

    climber = createSprite(door.x,50)
    climber.addImage(climberImg)
    climber.velocityY=1
    climber.lifetime=600
    climbersGroup.add(climber)

    invisibleBlock = createSprite(climber.x,60,climber.width,2)
    invisibleBlock.velocityY=1
    invisibleBlock.lifetime = 600
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.visible = true
  invisibleBlock.debug=true
  }
}

