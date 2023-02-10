var box1;
var box2;

function setup() 
{
  createCanvas(400, 400);
  box1 = new Box(100, 100, 20, 20, 3);
  box2 = new Box(100, 50, 50, 50, 2);
}

function draw() 
{
  background(220);
  box1.show();
  box1.mover();
  box2.show();
  box2.mover();
}

