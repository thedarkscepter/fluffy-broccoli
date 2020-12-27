const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig2;
var backgroundImg,platform;
var bird, slingshot;
//defining game state
var gameState = "onSling";
//making a variable for background image
var bg = "sprites/back.jpg";
//defining initial score as 0
var score = 0;

function preload() {
    //shoing backgroung image
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
//making ground,platform,boxes,pigs,bird,logsand slingshot
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    box5 = new Box(810,160,70,70);

    pig1 = new Pig(810, 370);
    pig2 = new Pig(810, 240);

    log1 = new Log(810,260,300, PI/2);
    log3 =  new Log(810,180,300, PI/2);
    log4 = new Log(760,120,150, PI/7);
    log2 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,70);

    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
    //writing Score with some formats
    noStroke();
    textSize(35);
    fill("black");
    text("Score: "+score,width-300,50);
    textSize(15);
    text("press space to attach the ball with the sling",width-300,75)
    //updating engine 
    Engine.update(engine);
    //displaying all elements
    ground.display();
    platform.display();
    
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    
    pig1.display();
    pig2.display();

    log1.display();
    log2.display();
    log3.display();
    log4.display();
        
    bird.display();
    
    slingshot.display();
    //executing score function for the pigs
    pig1.score();
    pig2.score();
}
//make the bird move along with the mouse when dragged
function mouseDragged(){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}
//making the bird fly when the mouse is released
function mouseReleased(){
    //executing fly function of class Sligshot and chaning gamestate
    slingshot.fly();
    gameState = "launched";
}
//removing trajectory and attaching the bird back to the slingshot when pressed space key
function keyPressed(){
    if(keyCode === 32){
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body,{x:200,y:50});
        slingshot.attach(bird.body);
    }
}
/*
//not working because of problem in the site
async function getBackgroundImg() {
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);

    if(hour>=06 && hour<=18) {
        bg = "sprites/back.jpg";
        //bg = "sprites/bg2.jpg";
    }else {
        bg = "sprites/back.jpg";
        //bg = "sprites/bg1.png";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
*/
//setting background
function getBackgroundImg() {
    backgroundImg = loadImage(bg);
}