
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var block1;
var block2;
var block3;
var plane;

function preload()
{
	
}

function setup() {
	createCanvas(548, 600);
	engine = Engine.create();
	world = engine.world;

	var block1_options = {
		restitution: 0.5,
		friction: 0.02,
		frictionAir: 0.03
	  }

	  var block2_options = {
		restitution: 0.7,
		friction: 0.01,
		frictionAir: 0.1
	  }

	  var block3_options = {
		restitution: 0.01,
		friction: 1,
		frictionAir: 0.3
	  }

	  var plane_options = {
		isStatic: true
	  }

	//Crie os Corpos Aqui.
	block1 = Bodies.circle(220,10,10,block1_options);
	World.add(world, block1);

	block2 = Bodies.rectangle(110,50,10,25,block2_options);
	World.add(world, block2);

	block3 = Bodies.rectangle(350,50,10,25,block3_options);
	World.add(world, block3);

	plane = Bodies.rectangle(300,600,500,25,plane_options);
  	World.add(world, plane);

	Engine.run(engine);
}


function draw() {
	rectMode(CENTER);
	ellipseMode(RADIUS);
	background("#95FC91");
	
	drawSprites();
	Engine.update(engine);

	ellipse(block1.position.x, block1.position.y, 20);
	rect(block2.position.x, block2.position.y, 50);
	rect(block3.position.x, block3.position.y, 100, 50);
	
	rect(plane.position.x, plane.position.y, 600, 1);
 
}



