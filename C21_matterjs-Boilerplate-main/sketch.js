const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

let engine;
let world;

var chao;
direita;
var esquerda;
var topo;
var bola;

var btn1;
var btn2;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;

    btn1 = createImg('right.png');
    btn1.position(220, 30);
    btn1.size(50, 50);
    btn1.mouseClicked(hForce);

    btn2 = createImg('up.png');
    btn2.position(20, 30);
    btn2.size(50, 50);
    btn2.mouseClicked(vForce);

    chao = new Ground(200, 390, 400, 20);
    direita = new Ground(390, 200, 20, 400);
    esquerda = new Ground(10, 200, 20, 400);
    topo = new Ground(200, 10, 400, 20);

    var bola_options = {
        restitution: 0.95
    }

    bola = Bodies.circle(200, 100, 20, bola_options);
    World.add(world, bola);

    rectMode(CENTER);
    ellipseMode(RADIUS);

}

function draw() {
    background(51);

    ellipse(bola.position.x, bola.position.y, 20);

    chao.show();
    direita.show();
    esquerda.show();
    topo.show();
    Engine.update(engine);
}

function hForce() {
    Matter.Body.applyForce(bola, {
        x: 0,
        y: 0
    }, {
        x: 0.05,
        y: 0
    });
}

function vForce() {
    Matter.Body.applyForce(bola, {
        x: 0,
        y: 0
    }, {
        x: 0,
        y: -0.05
    });
}
