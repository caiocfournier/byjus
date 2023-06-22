var bg,
    bgImg;
var player,
    shooterImg,
    shooter_shooting;
var zombie,
    zombieImg,
    zombieImg2;

var heart1,
    heart2,
    heart3;
var heart1Img,
    heart2Img,
    heart3Img;
var coracao;    

var zombieGroup;
var score = 0;
var recoveryLife = 0;
var life = 3;
var bullet;
var bullets = 10;
var bulletGroup;
var explosion;

var gameState = "shooting";



function preload() {

    heart1Img = loadImage("assets/heart_1.png");
    heart2Img = loadImage("assets/heart_2.png");
    heart3Img = loadImage("assets/heart_3.png");

    shooterImg = loadImage("assets/shooter_2.png");
    shooter_shooting = loadImage("assets/shooter_3.png");

    zombieImg = loadAnimation("assets/zumbi1.png", "assets/zumbi2.png", "assets/zumbi3.png", "assets/zumbi4.png", "assets/zumbi5.png", "assets/zumbi6.png", "assets/zumbi7.png", "assets/zumbi8.png", "assets/zumbi9.png", "assets/zumbi10.png", "assets/zumbi11.png", "assets/zumbi12.png")
    zombieImg2 = loadAnimation("assets/zumbi-verde1.png", "assets/zumbi-verde2.png", "assets/zumbi-verde3.png", "assets/zumbi-verde4.png", "assets/zumbi-verde5.png", "assets/zumbi-verde6.png", "assets/zumbi-verde7.png", "assets/zumbi-verde8.png", "assets/zumbi-verde9.png", "assets/zumbi-verde10.png", "assets/zumbi-verde11.png", "assets/zumbi-verde12.png", "assets/zumbi-verde13.png", "assets/zumbi-verde14.png", "assets/zumbi-verde15.png", "assets/zumbi-verde16.png", "assets/zumbi-verde17.png", "assets/zumbi-verde18.png")

    bgImg = loadImage("assets/bg3.jpeg");

    explosion = loadSound("assets/lose.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // adicionando a imagem de fundo
    /*bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.1;*/

    // criando o sprite do jogador
    player = createSprite(displayWidth - 1600, displayHeight - 300, 50, 50);
    player.addImage(shooterImg)
    player.scale = 0.4
    player.setCollider("rectangle", 0, 0, 300, 300)

    // criando sprites para representar vidas restantes
    heart1 = createSprite(displayWidth - 150, 40, 20, 20)
    heart1.visible = false
    heart1.addImage("heart1", heart1Img)
    heart1.scale = 0.3

    heart2 = createSprite(displayWidth - 100, 40, 20, 20)
    heart2.visible = false
    heart2.addImage("heart2", heart2Img)
    heart2.scale = 0.3

    heart3 = createSprite(displayWidth - 150, 40, 20, 20)
    heart3.addImage("heart3", heart3Img)
    heart3.scale = 0.3

    // criando grupo de zumbis
    zombieGroup = new Group();
    bulletGroup = new Group();
}

function draw() {
    background(bgImg);
    textSize(30);
    fill("white");
    text("balas; " + bullets, displayWidth - 500, 40);
    text("pontos; " + score, displayWidth - 700, 40);

    if (gameState === "shooting") { // solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada

        heart3.visible = false;
        heart2.visible = false;
        heart1.visible = false;

        if(life === 3){
            heart3.visible = true;
        }

        if(life === 2){
            heart2.visible = true;
        }

        if(life === 1){
            heart1.visible = true;
        }

        
        if(life === 0){
            gameState = "youlost";
        }
           

        if (keyWentDown("space")) {
            bullet = createSprite(player.x, player.y - 30, 20, 10);
            bullet.velocityX = 20;

            bulletGroup.add(bullet);
            player.depth = bullet.depth;
            player.depth += 2;
            player.addImage(shooter_shooting);
            bullets -= 1;
            explosion.play();
            explosion.setVolume(0.3);
        }

        // o jogador volta à imagem original quando pararmos de pressionar a barra de espaço else if (keyWentUp("space")) {
        else if(keyWentUp("space")){
          player.addImage(shooterImg);
        } 
       
    }
    // destrua o zumbi qunado o jogador tocar
    if (zombieGroup.isTouching(bulletGroup)) {
        for (var i = 0; i < zombieGroup.length; i++) {

            if (zombieGroup[i].isTouching(bulletGroup)) {
                if(zombieGroup[i].getAnimationLabel() === "zombie") {
                    score += 10;
                    recoveryLife += 10;
                } else if (zombieGroup[i].getAnimationLabel() === "zombie-verde") {
                    score += 5;
                    recoveryLife += 5;
                }
                zombieGroup[i].destroy();
                bullet.destroy(); 
            }
        }
    }

    if (bullets === 0 && gameState === "shooting") {
        gameState = "loading";
    }

    if(recoveryLife >= 100){ 
        if(life < 3) {
            life += 1;
        }
        recoveryLife = 0;
    }

    if (zombieGroup.isTouching(player)) {
      for (var i = 0; i < zombieGroup.length; i++) {

          if (zombieGroup[i].isTouching(player)) {
              zombieGroup[i].destroy();
              life -= 1;
          }
      }
  }

  if(gameState === "youlost"){
    textSize(100);
    fill("red");
    text("Você Perdeu", displayWidth/2 - 500, displayHeight/2);
    zombieGroup.destroyEach();
    player.destroy();
  }

    if (gameState === "loading" || gameState === "loaded") {
        textSize(100);
        fill("blue");
        text("Tempo de Recarga", displayWidth/2 - 500, displayHeight/2);
        if (gameState === "loading") {
            setTimeout(() => {
                bullets = 10;
                gameState = "shooting";
            }, 5000);
        }
        gameState = "loaded";
    }
    // movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
    if (keyDown("UP_ARROW") || touches.length > 0) {
        player.y = player.y - 30
    }

    if (keyDown("DOWN_ARROW") || touches.length > 0) {
        player.y = player.y + 30
    }

    if (keyDown("LEFT_ARROW") || touches.length > 0) {
        player.x = player.x - 30
    }

    if (keyDown("RIGHT_ARROW") || touches.length > 0) {
        player.x = player.x + 30
    }


    // chame a função para gerar zumbis
    enemy();
    enemy2();
    drawSprites();
}


// criando função para gerar zumbis
function enemy() {
    if (frameCount % 100 === 0) { // dando posições x e y aleatórias para o zumbi aparecer
        zombie = createSprite(random(1200, window.width), random(100, window.height-100));
       
        zombie.addAnimation("zombie", zombieImg);
        zombie.scale = 3;
        zombie.velocityX = -3;
        zombie.setCollider("rectangle", 0, 0, 90, 90);
      
        zombie.lifetime = 600;
        zombieGroup.add(zombie);
    }

}

function enemy2() {
    if (frameCount % 100 === 0) { // dando posições x e y aleatórias para o zumbi aparecer
        zombie2 = createSprite(random(1200, window.width), random(100, window.height-100));

        zombie2.addAnimation("zombie-verde", zombieImg2);
        zombie2.scale = 0.5;
        zombie2.velocityX = -8;
        zombie2.setCollider("rectangle", 0, 0, 400, 400);

        zombie2.lifetime = 400;
        zombieGroup.add(zombie2);
    }

}
