var tower, towerImage;
var ghost,ghostImage;
var gameState="play";

var doorImg, door, doorsGroup; var climberImg, climber, climbersGroup;
var invisibleBlockGroup, invisibleBlock;

function preload(){
towerImage=loadImage("tower.png");
ghostImage=loadAnimation("ghost-jumping.png","ghost-standing.png");
doorImg= loadImage("door.png");
climberImg=loadImage("climber.png");
spookySound=loadSound("spooky.wav");
}

function setup(){
createCanvas(600,600);
tower=createSprite(300,300);
tower.addImage(towerImage);
tower.velocityY=1;

ghost=createSprite(300,300);
ghost.addAnimation("ghost_running",ghostImage);
ghost.scale=0.3;

doorsGroup=new Group ();
climbersGroup=new Group();
invisibleBlockGroup=new Group();

spookySound.loop();
}

function draw(){
    background(0);

    if(gameState==="play")
{
    if(tower.y>400){
        tower.y=300;
    }


    if (keyDown("space")){
    ghost.velocityY=-10;
    }

    ghost.velocityY = ghost.velocityY + 0.8;
    
    if(keyDown("left_arrow")){
         ghost.x = ghost.x - 3; 
        } 
        
        if(keyDown("right_arrow")){ 
            ghost.x = ghost.x + 3; 
        }

    spawnDoors();

    if(ghost.y>600 || invisibleBlockGroup.isTouching(ghost)){ 
        ghost.destroy();
        gameState="end";
    }

if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
}


    drawSprites();
}

if (gameState === "end"){
     stroke("yellow");
      fill("yellow");textSize(30);
       text("Game Over", 230,250);
     } 
    }



    function spawnDoors(){
        if(frameCount%240===0){
            var door = createSprite(200, -50);
             var climber = createSprite(200,10); 
             var invisibleBlock = createSprite(200,15);
             invisibleBlock.width = climber.width;
              invisibleBlock.height = 2;
               door.x = Math.round(random(120,400));
                climber.x = door.x;
                 invisibleBlock.x = door.x; 
                 door.addImage(doorImg);
                  climber.addImage(climberImg);
                   door.velocityY = 1;
                    climber.velocityY = 1;
                     invisibleBlock.velocityY = 1;
                      ghost.depth = door.depth; 
            ghost.depth +=1;
            door.lifetime = 800;
             climber.lifetime = 800;
              invisibleBlock.lifetime = 800;
              doorsGroup.add(door);
               invisibleBlock.debug = true;
                climbersGroup.add(climber);
               invisibleBlockGroup.add(invisibleBlock);
        }
    }