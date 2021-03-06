const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var bird, elephant, doggy, oneeye, robot, tiger;

var ocean, ocean2, startingGround, startScreen, 
skip, quit, challangeScreen, background, 
leaderBoard, help, heart,characterScreen, gameOver;

var blocks=[];
var score=0;
var y=0;

function preload() {
ocean_png=loadImage("images/ocean.png")
startScreen_png=loadImage("images/startScreen.png")
skip_png=loadImage("images/skip.png")
quit_png=loadImage("images/quit.png")
challengeScreen_png=loadImage("images/challengeScreen.png")
Background_png=loadImage("images/Background.png")
leaderBoard_png=loadImage("images/leaderBoard.png")
help_png=loadImage("images/help.png")
heart_png=loadImage("images/heart.png")
blocks_png=loadImage("images/blocks.png")
characterScreen_png=loadImage ("images/characterScreen.png")
gameOver_png=loadImage("images/gameOver.png")

bird_png=loadImage("characters/bird.png")
elephant_png=loadImage("characters/elephant.png")
doggy_png=loadImage("characters/doggy.png")
oneeye_png=loadImage("characters/oneeye.png")
robot_png=loadImage("characters/robot.png")
tiger_png=loadImage("characters/tiger.png")

sounds_gameOverSound=loadSound("Sounds/sounds_gameOverSounds.ogg")
sounds_getReady=loadSound("Sounds/sounds_getReady.ogg")
sounds_jumping_sound_1=loadSound("Sounds/sounds_jumping_sound_1.ogg")
}


function setup() {
  createCanvas(displayWidth, displayHeight);

  engine = Engine.create();
  world = engine.world;

  ocean=new Ocean(displayWidth/2, displayHeight-150,displayWidth,displayHeight/2)

  startingGround=new Ground(displayWidth/2, displayHeight/2 ,400,40);
  player=new Bird(displayWidth/2, displayHeight/3, 50)
console.log(startingGround);
console.log(player.body.position.y)

y=startingGround.body.position.y-35;
console.log("y"+y);
console.log("displayHeight:;"+displayHeight);
//block=new Blocks(270,231,100,30);

console.log(startingGround.body.position.x)
}

function draw() {
  background(Background_png);  
  Engine.update(engine);
  var startingGroundPos=startingGround.body.position; 
  text(mouseX+", "+mouseY,mouseX,mouseY);
  if(frameCount%100===0){
    var rand=Math.round(random(1,2))
    if (rand===1){
     // y=player.body.position.y;
y=y-30
      blocks.push(new Blocks(startingGroundPos.x-200,y,100,30));
      for(var i=0;i<blocks.length;i++){
      //  Matter.Body.setVelocity(blocks[i].body, {x:8, y:0}); 
      console.log("for loop for rand case 1")

        Matter.Body.applyForce(blocks[i].body,blocks[i].body.position, {x:225, y:0}); 
        task(i);

        console.log(blocks[i].body.position.x)
        console.log(startingGroundPos)

        
      }
    }
    else{
     // y=player.body.position.y 
y=y-30
      blocks.push(new Blocks(startingGroundPos.x+200,y,100,30)); 
      for(var i=1;i<blocks.length;i++){
     //   Matter.Body.setVelocity(blocks[i].body, {x:-8, y:0}); 
        Matter.Body.applyForce(blocks[i].body,blocks[i].body.position, {x:-225, y:0}); 

      }
    }
   // Matter.Body.setVelocity(blocks.body, {x:0, y:8});
  }

  if(player.body.position.x>startingGroundPos.x+200||player.body.position.x<startingGroundPos.x-200){
    text("GAME OVER,",382,167);
  }

  for (var b = 0; b < blocks.length; b++) {
    blocks[b].display();
    }

startingGround.display();
player.display();
ocean.display();

  drawSprites();
  text(mouseX+","+mouseY,mouseX,mouseY);
  textSize(30);
  text("Score " +score,53,32)
}

function keyPressed(){
  if(touches.length>0||keyCode === 32){
  Matter.Body.setVelocity(player.body, {x:0, y:8}); 
  sounds_jumping_sound_1.play();
  score=score+50;
  touches=[]
  }
  //Left arrow key
  if(keyCode === 37){
    Matter.Body.setVelocity(player.body, {x:-2, y:0}); 
    }
//Up arrow key
    if(keyCode === 38){
      Matter.Body.setVelocity(player.body, {x:0, y:-8}); 
      }
//Right arrow key
      if(keyCode === 39){
        Matter.Body.setVelocity(player.body, {x:2, y:0}); 
        }
  }

  function task(i) {
    setTimeout(function() {
        // Add tasks to do
        if(blocks[i].body.position.x===startingGround.body.position){
          Matter.Body.setStatic(blocks[i].body,true);
          console.log("equals satisfied");
        }
    }, 2000 * i);
  }