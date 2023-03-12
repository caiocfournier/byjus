const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,
    world,
    ground;
var backgroundImg;
var torre,
    torreImg;
var canhao,
    angulo,
    canhaoBola;

function preload() {
    backgroundImg = loadImage("./assets/background.gif");
    torreImg = loadImage("./assets/tower.png");
}

function setup() {

    canvas = createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;

    angleMode(DEGREES);
    angulo = 15;

    var options = {
        isStatic: true
    }

    ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
    World.add(world, ground);

    torre = Bodies.rectangle(160, 350, 160, 310, options);
    World.add(world, torre);

    canhao = new Canhao(180, 110, 130, 100, angulo);
    canhaoBola = new CanhaoBola(canhao.x, canhao.y);
}

function draw() {
    image(backgroundImg, 0, 0, width, height);

    Engine.update(engine);

    rect(ground.position.x, ground.position.y, width * 2, 1);

    push();
    imageMode(CENTER);
    image(torreImg, torre.position.x, torre.position.y, 160, 310);
    pop();

    canhao.display();
    canhaoBola.display();
}
