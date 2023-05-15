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
var rope,
    rope2,
    rope3;
var fruit;
var fruit_con,
    fruit_con2,
    fruit_con3;

var bg_img;
var food;
var rabbit;

var bunny;
var button,
    button2,
    button3;
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

var canW,
    canH;

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
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        canW = displayWidth;
        canH = displayHeight;
        createCanvas(canW + 80, canH);
    } else {
        canW = windowWidth;
        canH = windowHeight;
        createCanvas(canW, canH);
    }
    

    bg_sound.play();
    bg_sound.setVolume(0.5);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(200, canH, 600, 20);
    rope = new Rope(9, {
        x: 40,
        y: 30
    });
    rope2 = new Rope(7, {
        x: 370,
        y: 40
    });
    rope3 = new Rope(4, {
        x: 400,
        y: 220
    });

    button = createImg("cut_btn.png");
    button.position(20, 30);
    button.size(50, 50);
    button.mouseClicked(drop);

    button2 = createImg("cut_btn.png");
    button2.position(330, 35);
    button2.size(50, 50);
    button2.mouseClicked(drop2);

    button3 = createImg("cut_btn.png");
    button3.position(360, 200);
    button3.size(50, 50);
    button3.mouseClicked(drop3);

    mute_btn = createImg("mute.png");
    mute_btn.position(450, 20);
    mute_btn.size(50, 50);
    mute_btn.mouseClicked(mute);

    blink.frameDelay = 15;
    eat.frameDelay = 20;
    sad.frameDelay = 20;

    bunny = createSprite(100, canH - 80, 100, 100);
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
    fruit_con2 = new Link(rope2, fruit);
    fruit_con3 = new Link(rope3, fruit);

    rectMode(CENTER);
    ellipseMode(RADIUS);
    textSize(50);
    imageMode(CENTER);
}

function draw() {
    background(51);
    image(bg_img, 0, 0, canW, canH );

    ground.show();
    rope.show();
    rope2.show();
    rope3.show();

    if (fruit != null) {
        image(food, fruit.position.x, fruit.position.y, 60, 60);
    }

    if (collided(fruit, bunny) == true) {
        bunny.changeAnimation("eating");
        eating_sound.play()
    }
    if (fruit != null && fruit.position.y >= 650) {
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

function drop2() {
    cut_sound.play();
    rope2.break();
    fruit_con2.detach();
    fruit_con2 = null;
}

function drop3() {
    cut_sound.play();
    rope3.break();
    fruit_con3.detach();
    fruit_con3 = null;
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


function mute() {
    if (bg_sound.isPlaying()) {
        bg_sound.stop();
    } else {
        bg_sound.play();
    }
}
