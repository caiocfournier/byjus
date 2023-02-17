const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;
var ball;
var ground;
var wedge;
var angle=60;
var poly;

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world; 
  
  var ball_opitions = {
    restitution: 0.95,
    frictionAir: 0.01
  }
   
  var ground_opitions = {
    isStatic: true
  }

  ball = Bodies.circle(100, 10, 20, ball_opitions);
  World.add(world, ball);

  ground = Bodies.rectangle(200, 390, 400, 20, ground_opitions);
  World.add(world, ground);
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
}


function draw() 
{
  background(51);
  Engine.update(engine);

  ellipse(ball.position.x, ball.position.y, 20);
  
  rect(ground.position.x, ground.position.y, 400, 20);
}

