var path,
    boy,
    cash,
    diamonds,
    jwellery,
    sword,
    banana;
var pathImg,
    boyImg,
    cashImg,
    diamondsImg,
    jwelleryImg,
    swordImg,
    bananaImg,
    pedraImg,
    lixoImg;
var treasureCollection = 0;
var cashG,
    diamondsG,
    jwelleryG,
    swordGroup,
    bananaGroup,
    pedraGroup,
    lixoGroup;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
    pathImg = loadImage("Road.png");
    boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
    cashImg = loadImage("cash.png");
    diamondsImg = loadImage("diamonds.png");
    jwelleryImg = loadImage("jwell.png");
    swordImg = loadImage("sword.png");
    bananaImg = loadImage("banana.png");
    pedraImg = loadImage("pedra.png");
    lixoImg = loadImage("lixo.png");
    endImg = loadAnimation("fimdeJogo.png");
}

function setup() {

    createCanvas(windowWidth, windowHeight);

    path = createSprite(width / 2, 200);
    path.addImage(pathImg);
    path.velocityY = 4;

    boy = createSprite(width / 2, height - 20, 20, 20);
    boy.addAnimation("SahilRunning", boyImg);
    boy.scale = 0.08;


    cashG = new Group();
    diamondsG = new Group();
    jwelleryG = new Group();
    swordGroup = new Group();
    bananaGroup = new Group();
    pedraGroup = new Group();
    lixoGroup = new Group();


}

function draw() {

    if (gameState === PLAY) {
        background(0);
        boy.x = World.mouseX;

        edges = createEdgeSprites();
        boy.collide(edges);


        if (path.y > height) {
            path.y = height / 2;
        }

        createGameImage(200, cashImg, 0.12, cashG);
        createGameImage(320, diamondsImg, 0.03, diamondsG);
        createGameImage(410, jwelleryImg, 0.13, jwelleryG);
        createGameImage(530, swordImg, 0.1, swordGroup);
        createGameImage(250, bananaImg, 0.09, bananaGroup);
        createGameImage(350, pedraImg, 0.09, pedraGroup);
        createGameImage(450, lixoImg, 0.2, lixoGroup);

        if (cashG.isTouching(boy)) {
            cashG.destroyEach();
            treasureCollection += 50;
        } else if (diamondsG.isTouching(boy)) {
            diamondsG.destroyEach();
            treasureCollection += 100;

        } else if (jwelleryG.isTouching(boy)) {
            jwelleryG.destroyEach();
            treasureCollection += 150;

        } else if (bananaGroup.isTouching(boy)) {
            bananaGroup.destroyEach();
            if (treasureCollection <= 50) {
                treasureCollection = 0;
            } else {
                treasureCollection -= 50;
            }
        } else if (pedraGroup.isTouching(boy)) {
            pedraGroup.destroyEach();
            if (treasureCollection <= 100) {
                treasureCollection = 0;
            } else {
                treasureCollection -= 100;
            }
        } else if (lixoGroup.isTouching(boy)) {
            lixoGroup.destroyEach();
            if (treasureCollection <= 150) {
                treasureCollection = 0;
            } else {
                treasureCollection -= 150;
            }
        } else {
            if (swordGroup.isTouching(boy)) {
                gameState = END;

                boy.addAnimation("SahilRunning", endImg);
                boy.x = width / 2;
                boy.y = height / 2;
                boy.scale = 0.6;

                cashG.destroyEach();
                diamondsG.destroyEach();
                jwelleryG.destroyEach();
                swordGroup.destroyEach();
                bananaGroup.destroyEach();
                pedraGroup.destroyEach();
                lixoGroup.destroyEach();

                cashG.setVelocityYEach(0);
                diamondsG.setVelocityYEach(0);
                jwelleryG.setVelocityYEach(0);
                swordGroup.setVelocityYEach(0);
                bananaGroup.setVelocityYEach(0);
                pedraGroup.setVelocityYEach(0);
                lixoGroup.setVelocityYEach(0);

            }
        }

        drawSprites();
        textSize(20);
        fill(255);
        text("Tesouro: " + treasureCollection, width - 150, 30);
    }

}

function createGameImage(frameCount, imgName, scale, group) {
  if (World.frameCount % frameCount == 0) {
      var image = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
      image.addImage(imgName);
      image.scale = scale;
      image.velocityY = 5;
      image.lifetime = 200;
      group.add(image);
  }
}
