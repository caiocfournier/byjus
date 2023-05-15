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
    rope2;
var fruit;
var fruit_con,
    fruit_con2;

var bg_img;
var food;
var rabbit;

var bunny;
var button,
    button2;
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

var star_img, star1, star2;

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

    star_img = loadImage("star.png")

    blink.playing = true;
    eat.playing = true;
    sad.playing = true;

    sad.looping = false;
    eat.looping = false;
}
function setup() {
    
  createCanvas(600, 700);

    bg_sound.play();
    bg_sound.setVolume(0.5);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(300, height, width, 20);
    rope = new Rope(7, {
        x: 120,
        y: 90
    });
    rope2 = new Rope(7, {
        x: 490,
        y: 90
    });
    button = createImg("cut_btn.png");
    button.position(100, 90);
    button.size(50, 50);
    button.mouseClicked(drop);

    button2 = createImg("cut_btn.png");
    button2.position(450, 90);
    button2.size(50, 50);
    button2.mouseClicked(drop2);

    mute_btn = createImg("mute.png");
    mute_btn.position(width-50, 20);
    mute_btn.size(50, 50);
    mute_btn.mouseClicked(mute);

    blink.frameDelay = 15;
    eat.frameDelay = 20;
    sad.frameDelay = 20;

    bunny = createSprite(100, height - 80, 100, 100);
    bunny.scale = 0.2;

    bunny.addAnimation("blinking", blink);
    bunny.addAnimation("eating", eat);
    bunny.addAnimation("crying", sad);

    bunny.changeAnimation("blinking");

    star1 = createSprite(320, 50, 20, 20);
    star1.addImage(star_img);
    star1.scale = 0.02;

    star2 = createSprite(50, 330, 20, 20);
    star2.addImage(star_img);
    star2.scale = 0.02;

    ballon = createImg("baloon2.png")
    ballon.position(260,370);
    ballon.size(120,120);
    ballon.mouseClicked(airBallon);

    var fruit_options = {
        density: 0.001
    }

    fruit = Bodies.circle(300, 300, 15, fruit_options);
    Composite.add(rope.body, fruit);

    fruit_con = new Link(rope, fruit);
    fruit_con2 = new Link(rope2, fruit);

    rectMode(CENTER);
    ellipseMode(RADIUS);
    textSize(50);
    imageMode(CENTER);
}

function draw() {
    background(51);
    image(bg_img, width/2, height/2, width, height);

    ground.show();
    rope.show();
    rope2.show();

    if (fruit != null) {
        image(food, fruit.position.x, fruit.position.y, 60, 60);
    }

    if (collided(fruit, bunny, 80) == true){
        World.remove(engine.world, fruit);
        fruit = null;
        bunny.changeAnimation("eating");
        eating_sound.play()
    }
    if (fruit != null && fruit.position.y >= 650) {
        bunny.changeAnimation("crying");
        bg_sound.stop();
        sad_sound.play();
        fruit = null;
    }

    if (collided(fruit, star1, 20) == true){
      star1.visible = false
    }

    if (collided(fruit, star2, 20) == true){
        star2.visible = false
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

function collided(body, sprite, x) {
    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (d <= x) {
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

function airBallon(){
    Body.applyForce(fruit, {x:0, y:0}, {x:0, y:-0.03});
    air_sound.play();
}
