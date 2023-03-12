
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Vector = Matter.Vector;

var ball, groundObj, leftSide, rightSide, rightWall;

function preload()
{
	
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	var ball_options = {
		isStatic: false,
		restitution: 0.3,
		friction: 0,
		density: 1.2
	};

	//Create the Bodies Here.
	engine = Engine.create();
	world = engine.world;

	groundObj = new Ground(width/2, height-10, width, 10);
	leftSide = new Ground(width-650, height-70, 10, 120);
	rightSide = new Ground(width-400, height-70, 10, 120);
	rightWall = new Ground(width-5, height-10, 10, height*2);

	ball = Bodies.circle(200, 100, 20, ball_options);
    World.add(world, ball);

    rectMode(CENTER);
    ellipseMode(RADIUS);


	Engine.run(engine);
  
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		Body.applyForce(ball, Vector.create(20,50), Vector.create(50,20));
	}
}

function draw() {
  rectMode(CENTER);
  background(0);
  fill("#fff");
  groundObj.display();
  leftSide.display();
  rightSide.display();
  rightWall.display();

  ellipse(ball.position.x, ball.position.y, 20);
  
  Engine.update(engine);
}



