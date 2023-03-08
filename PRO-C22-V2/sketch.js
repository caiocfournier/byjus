const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,
    world;
var canvas;
var player,
    playerBase,
    playerArcher;
var baseimage,
    archerimage;

function preload() {
    backgroundImg = loadImage("./assets/background.png");
    baseimage = loadImage("./assets/base.png");
    playerimage = loadImage("./assets/player.png");
    archerimage = loadImage("./assets/playerArcher.png");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    engine = Engine.create();
    world = engine.world;

    angleMode(DEGREES);

    // criar corpo da base do jogador
    var options = {
        isStatic: true
    };

    playerBase = Bodies.rectangle(200, 350, 180, 150, options);
    World.add(world, playerBase);

    // criar corpo do jogador
    player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
    World.add(world, player);

    playerArcher = Bodies.rectangle(250, player.position.y - 160, 50, 180, options);
    World.add(world, playerArcher);
}

function draw() {
    background(backgroundImg);

    Engine.update(engine);
    // exibir a imagem do jogador usando a função image()
    image(playerimage, player.position.x, player.position.y, 50, 180);

    // exibir a imagem da basejogador usando a função image()
    image(baseimage, playerBase.position.x, playerBase.position.y, 180, 150);

    image(archerimage, 300, 230, 100, 100);

    // Title
    fill("#FFFF");
    textAlign("center");
    textSize(40);
    text("ARQUEIRO ÉPICO", width / 2, 100);
}
