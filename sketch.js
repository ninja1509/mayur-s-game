var player, bow, arrow, arrowGroup,opponent;
var flag = [];
var score = 0;
var gameState = "play";



function preload(){
  arrowImage = loadImage("arrow0.png");
  playerImage = loadImage("Archer.png");
   Zombie1 = loadAnimation("mayur/f1.png","mayur/f2.png","mayur/f3.png","mayur/f4.png");
   Zombie2 = loadAnimation("mayur/o1.png","mayur/o2.png","mayur/o3.png","mayur/o4.png");
   Zombie3 = loadAnimation("mayur/s1.png","mayur/s2.png","mayur/s3.png","mayur/s4.png");
   Zombie4 = loadAnimation("mayur/z1.png","mayur/z2.png","mayur/z3.png","mayur/z4.png");

  backgroundImage = loadImage("bg.png");
  hoveringGroundImage = loadImage("hg.png");
  GameOver = loadImage("GameEnd.png");
}


function setup() {
  createCanvas(displayWidth,displayHeight);
  
  player = createSprite(180,displayHeight-150,40,40);
  player.addImage(playerImage);
  player.debug = true;
  player.scale = 0.75;

  hoveringGround = createSprite(displayWidth-225,displayHeight-550,100,20)
  hoveringGround.addImage(hoveringGroundImage);
  hoveringGround.scale = 0.75;
  hoveringGround.debug = true;
  hoveringGround.setCollider("rectangle",50,0,500,100)

  invisibleGround = createSprite(displayWidth/2,displayHeight,displayWidth,50);
  invisibleGround.visible = true;


  arrowGroup = new Group();
  ZombieGroup1 = new Group();
  ZombieGroup2 = new Group();
  ZombieGroup3 = new Group();
  ZombieGroup4 = new Group();
 


}

function draw() {
   
  ZombieGroup1.collide(invisibleGround)
  ZombieGroup1.collide(hoveringGround)
  ZombieGroup1.setVelocityEach(Math.round(random(-1,-4)),5);

  ZombieGroup2.collide(invisibleGround)
  ZombieGroup2.collide(hoveringGround)
  ZombieGroup2.setVelocityEach(Math.round(random(-1,-4)),5);

  ZombieGroup3.collide(invisibleGround)
  ZombieGroup3.collide(hoveringGround)
  ZombieGroup3.setVelocityEach(Math.round(random(-1,-4)),5);

  ZombieGroup4.collide(invisibleGround)
  ZombieGroup4.collide(hoveringGround)
  ZombieGroup4.setVelocityEach(Math.round(random(-1,-4)),5);


  if(gameState == "play"){
   if(keyWentDown("SPACE")){
     createArrow();
   } 

   if(arrowGroup.isTouching(ZombieGroup1)){
    ZombieGroup1.destroyEach();
     flag.shift();
     arrowGroup.destroyEach();
     score+=1;
   }

   if(arrowGroup.isTouching(ZombieGroup2)){
    ZombieGroup2.destroyEach();
    flag.shift();
    arrowGroup.destroyEach();
    score+=1;
  }

  if(arrowGroup.isTouching(ZombieGroup3)){
    ZombieGroup3.destroyEach();
    flag.shift();
    arrowGroup.destroyEach();
    score+=1;
  }

  if(arrowGroup.isTouching(ZombieGroup4)){
    ZombieGroup4.destroyEach();
    flag.shift();
    arrowGroup.destroyEach();
    score+=1;
  }

   createZombies();

   
     if(ZombieGroup.isTouching(player)){
      gameState == "end";
        reset();
     }
    
    background(backgroundImage); 
    
  }
   
   else if(gameState == "end"){
     background(GameOver);
     player.destroy();
     ZombieGroup1.destroyEach();
     ZombieGroup2.destroyEach();
     ZombieGroup3.destroyEach();
     ZombieGroup4.destroyEach();
     arrowGroup.destroyEach();
     invisibleGround.destroy();
     hoveringGround.destroy();
   }
  
  drawSprites();
  
   fill("white");
   textSize(30)
   text("Score "+ score, displayWidth-200,50);
   
   

  } 
function createArrow() {
    var arrow= createSprite(30,displayHeight-200,10,10);
    arrow.addImage(arrowImage);
    arrow.x =player.x;
    //arrow.y=player.y;
    arrow.velocityX = 4;
    arrow.lifetime = displayWidth;
    arrow.scale = 0.4;
    arrowGroup.add(arrow);
}

function createZombies(){
  if(frameCount%100==0){
    
    opponent = createSprite(displayWidth,displayHeight-750,40,40);
    opponent.debug=true

    var randomN = Math.round(random(1,2));
      if(randomN == 1){
      opponent.y = displayHeight-150;
      }
      else if(randomN == 2){
      opponent.y = displayHeight-750;   
      
      }
      opponent.velocityY = opponent.velocityY+3
    opponent.velocityX = Math.round(random(-1,-4));
    opponent.lifetime = displayWidth;
    
  
  Zombie = Math.round(random(1,4));
  switch(Zombie){
    case 1: opponent.addAnimation("f3", Zombie2);
    flag.push(opponent);
    f = 1;
    ZombieGroup1.add(opponent);
    break;
    case 2: opponent.addAnimation("f2",Zombie3);
    flag.push(opponent);
    f=2;
    opponent.y = displayHeight-100;
    opponent.scale = 1.2;
    ZombieGroup2.add(opponent);
    break;

    case 3: opponent.addAnimation("f4",Zombie4);
    f=3;
    flag.push(opponent);
    ZombieGroup3.add(opponent);
    break;

    case 4: opponent.addAnimation("f1",Zombie1);
    f=4;
    flag.push(opponent);
    ZombieGroup4.add(opponent);
    break;

    default: break;
  }
  

  
}
}
















function reset(){
  gameState = "play";
  score = 0;
}