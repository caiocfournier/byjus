const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var rope;
var fruit;
var fruit_con;

var bg_img;
var food;
var rabbit;

var bunny;
var button;
var ballon;
var mute_btn;

var blink,
    eat,
    sad;

var bg_sound;
var cut_sound;
var sad_sound;
var eating_sound;
var air_sound;

function preload() {
    bg_img = loadImage("background.png");
    food = loadImage("melon.png");

    bg_sound = loadSound("sound1.mp3");
    cut_sound = loadSound("rope_cut.mp3");
    sad_sound = loadSound("sad.wav");
    eating_sound = loadSound("eating_sound.mp3");
    air_sound = loadSound("air.wav");

    rabbit = loadImage("Rabbit-01.png");
    blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
    eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
    sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

    blink.playing = true;
    eat.playing = true;
    sad.playing = true;

    sad.looping = false;
    eat.looping = false;
}
function setup() {
    createCanvas(500, 700);

    bg_sound.play();
    bg_sound.setVolume(0.5);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(200, 690, 600, 20);
    rope = new Rope(6, {
        x: 245,
        y: 30
    });

    button = createImg("cut_btn.png");
    button.position(220, 30);
    button.size(50, 50);
    button.mouseClicked(drop);

    mute_btn = createImg("mute.png");
    mute_btn.position(450, 20);
    mute_btn.size(50, 50);
    mute_btn.mouseClicked(mute);

    ballon = createImg("balloon.png");
    ballon.position(10, 195);
    ballon.size(150, 100);
    ballon.mouseClicked(airballon);

    blink.frameDelay = 15;
    eat.frameDelay = 20;
    sad.frameDelay = 20;

    bunny = createSprite(420, 625, 100, 100);
    bunny.scale = 0.2;

    bunny.addAnimation("blinking", blink);
    bunny.addAnimation("eating", eat);
    bunny.addAnimation("crying", sad);

    bunny.changeAnimation("blinking");

    var fruit_options = {
        density: 0.001
    }

    fruit = Bodies.circle(300, 300, 15, fruit_options);
    Composite.add(rope.body, fruit);

    fruit_con = new Link(rope, fruit);

    rectMode(CENTER);
    ellipseMode(RADIUS);
    textSize(50);
    imageMode(CENTER);
}

function draw() {
    background(51);
    image(bg_img, width / 2, height / 2, 500, 700);

    ground.show();
    rope.show();

    if (fruit != null) {
        image(food, fruit.position.x, fruit.position.y, 60, 60);
    }

    if (collided(fruit, bunny) == true) {
        bunny.changeAnimation("eating");
        eating_sound.play()
    }
    if (fruit != null &&fruit.position.y >= 650) {
        bunny.changeAnimation("crying");
        bg_sound.stop();
        sad_sound.play();
        fruit = null;
    }

    Engine.update(engine);
    drawSprites();
}

function drop() {
    cut_sound.play();
    rope.break();
    fruit_con.detach();
    fruit_con = null;
}

function collided(body, sprite) {
    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (d <= 80) {
            World.remove(engine.world, fruit);
            fruit = null;
            return true;
        } else {
            return false;

        }
    }
}

function airballon() {
    Body.applyForce(fruit, {
        x: 0,
        y: 0
    }, {
        x: 0.01,
        y: 0
    });
   air_sound.play() 
}

function mute(){
    if(bg_sound.isPlaying()){
        bg_sound.stop();
    } else {
        bg_sound.play();
    }
}
