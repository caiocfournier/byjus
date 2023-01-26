var trex, trex_correndo;
var chao, chao_imagem, chao_invisivel;

function preload(){
  trex_correndo = loadAnimation("trex1.png", "trex3.png", 
  "trex4.png");
    chao_imagem = loadImage("ground2.png");
}

function setup(){
  createCanvas(600, 200);
 
  trex = createSprite(50, 160, 20, 50);
  trex. addAnimation("correndo", trex_correndo);
  trex.scale = 0.5;

  chao = createSprite(200, 180, 400, 20);
  chao.addImage("chao", chao_imagem);
  chao.x = chao.width / 2;

  chao_invisivel = createSprite(200, 190, 400, 10);
  chao_invisivel.visible = false;
}

function draw(){
  background(220);

 chao.velocityX = -5;

if(chao.x < 0){
  chao.x = chao.width / 2;
}


 if(keyDown("space") && trex.y >= 100){
   trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.5;
  trex.collide(chao_invisivel);

  drawSprites();
}