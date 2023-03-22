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
var bolas = [];
var barcos = [];
var barcospriteData,
    barcospritesheet;
var barcoAnimantion = [];

function preload() {
    backgroundImg = loadImage("./assets/background.gif");
    torreImg = loadImage("./assets/tower.png");
    barcospriteData = loadJSON("assets/boat/boat.json");
    barcospritesheet = loadImage("assets/boat/boat.png");
}

function setup() {

    canvas = createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;
    var barcoFrame = barcospriteData.frames
    for (var i = 0; i < barcoFrame.length; i++) {
        var pos = barcoFrame[i].position;
        var img = barcospritesheet.get(pos.x, pos.y, pos.w, pos.h)
        barcoAnimantion.push(img)
    }

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
}

function draw() {
    image(backgroundImg, 0, 0, width, height);

    Engine.update(engine);

    rect(ground.position.x, ground.position.y, width * 2, 1);

    push();
    imageMode(CENTER);
    image(torreImg, torre.position.x, torre.position.y, 160, 310);
    pop();

    for (var i = 0; i < bolas.length; i++) {
        mostrarCanhaoBola(bolas[i], i);
        colisaoComBarco(i);
    }

    canhao.display();
    mostrarBarcos();
}


function colisaoComBarco(index) {
    for (var i = 0; i < barcos.length; i++) {
        if (bolas[index] !== undefined && barcos[i] !== undefined) {
            var colisao = Matter.SAT.collides(bolas[index].body, barcos[i].body);
            if (colisao.coliseded) {
                barcos[i].remove[i];

                Matter.World.remove(world, bolas[index].body);
                delete bolas[index]
            }
        }
    }
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        canhaoBola = new CanhaoBola(canhao.x, canhao.y);
        canhaoBola.trajetoria = [];
        Matter.Body.setAngle(canhaoBola.body, canhao.angulo);
        bolas.push(canhaoBola);
    }
}

function mostrarCanhaoBola(bola, index) {
    if (bola) {
        bola.display();
        if (bola.body.position.x >= width || bola.body.position.y >= height - 50) {
            bola.remove(index);
        }
    }
}

function mostrarBarcos() {
    if (barcos.length > 0) {
        if (barcos[barcos.length - 1] === undefined || barcos[barcos.length - 1].body.position.x < width - 300) {
            var posicoes = [-40, -60, -70, -20];
            var posicao = random(posicoes);
            var barco = new Barco(width, height - 100, 170, 170, posicao,barcoAnimantion);

            barcos.push(barco);
        }

        for (var i = 0; i < barcos.length; i++) {
            if (barcos[i]) {
                Matter.Body.setVelocity(barcos[i].body, {
                    x: -0.9,
                    y: 0
                });

                barcos[i].display();
                barcos[i].animate();
            }
        }
    } else {
        barco = new Barco(width - 79, height - 60, 170, 170, -80,barcoAnimantion);
        barcos.push(barco);
    }
}

function keyReleased() {
    if (keyCode === DOWN_ARROW) {
        bolas[bolas.length - 1].atirar();
    }
}
