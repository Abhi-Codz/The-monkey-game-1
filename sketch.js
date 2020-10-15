//Naming some of the main variables

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var invisibleGround;
var ground, grass;

var obstacle, obstacleGroup, obstacleImage, banana, bananaImage, bananaGroup;

var survivalTime = 0;

var bananaCollection = 0;


function preload()
{
  //Loading animation for monkey sprite 
  monkey_running = loadAnimation("Monkey assest0.png", "Monkey asset1.png", "Monkey asset2.png", "Monkey asset3.png", "Monkey asset4.png", "Monkey asset5.png", "Monkey asset6.png", "Monkey asset7.png", "Monkey asset8.png");
  
  //Loading image for obstacle sprite
  obstacleImage = loadImage("Obstacle for monkey.png");

  //Loading image for banana sprite
  bananaImage = loadImage("Banana for monkey-1.png");
}


function setup() 
{
  createCanvas(600, 500);
  
  //Creating sprite for monkey
  monkey = createSprite(80, 350, 20, 20);
  monkey.addAnimation("running monkey", monkey_running);
  monkey.scale = 0.1; 
  
  //Creating sprite for bg
  ground = createSprite(400, 470, 600, 60);
  ground.velocityX = -4;
  ground.shapeColor = "#D49D15";
  ground.x = ground.width/2;
  console.log(ground.x);

  //Creating sprite for grass
  grass = createSprite(400, 445, 600, 10);
  grass.velocityX = -4;
  grass.shapeColor = "#8FFF00";
  grass.x = grass.width/2;
  console.log(grass.x);

  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  bananaGroup = new Group();
  
  console.log("Be creative");
  print("Be inspired");
}

function draw() 
{
  background("#A3F3F6");

  //Adding text for survivalTime
  stroke("black");
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  {
    text("SURVIVALTIME: "+ survivalTime, 450,50);
  }

  //Adding text for banana collection
  stroke("black");
  fill("black");
  text("BANANA COLLECTION: " + bananaCollection, 420, 80);
  
  if(gameState === PLAY)
  {
    //Moving the ground
    ground.velocityX = -4;
    grass.velocityX = -4;
    
    //Adding controls to the young little mo key
    if(keyDown("space")&& monkey.y >= 100) 
  {
    monkey.velocityY = -13;
  }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
   //Adding a conditional statement for the banana to disappear once the monkey touches it
   if(monkey.isTouching(bananaGroup))
   {
    bananaGroup.destroyEach();
    bananaCollection = bananaCollection+1;
   }

   if(monkey.isTouching(obstaclesGroup))
    {
     bananaCollection = bananaCollection-1;
    }
  
  if (ground.x < 300)
  {
    ground.x = ground.width/2;
  }  

  if (grass.x < 300)
  {
    grass.x = grass.width/2;
  }

   obstaclesGroup.debug = true;

    
  }
  else if(gameState === END){
    //Stopping the ground
    ground.velocityX = 0;
    grass.velocityX = 0;
  
  }
  
  
  //spawn the banana
  spawnBananas();
  
  //spawn obstacles on the ground
  spawnObstacles();
  
  drawSprites();
   
  //Adding collidation effect between the monkey and the ground
  monkey.collide(ground);
  

}

function spawnObstacles(){
 if (frameCount % 120 === 0){
   var obstacle = createSprite(510, 405, 10, 40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);

   //Assigning scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   
   //Adding obstacles to the group
   obstaclesGroup.add(obstacle);

   //Adding depth between both the sprites
   obstacle.depth = monkey.depth;
   monkey.depth = monkey.depth+1;
 }
}



function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) 
  {
     banana = createSprite(700,700,40,10);
     banana.y = Math.round(random(10,60));
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -6;
    
     //Assigning lifetime to the variable
     banana.lifetime = 300;
    
    //adding cloud to the group
    bananaGroup.add(banana);
  }
}