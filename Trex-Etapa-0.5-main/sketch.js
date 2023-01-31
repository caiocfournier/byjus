var trex, trex_correndo;
var chao, chao_imagem, chao_invisivel;
var nuvem, nuvem_imagem;

function preload(){
  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  chao_imagem = loadImage("ground2.png");
  nuvem_imagem = loadImage("cloud.png")
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
  background(255);

 chao.velocityX = -5;

if(chao.x < 0){
  chao.x = chao.width / 2;
}


 if(keyDown("space") && trex.y >= 100){
   trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.5;
  trex.collide(chao_invisivel);

  criarNuvens();

  drawSprites();

  console.log(frameCount);
}

function criarNuvens(){
  if(frameCount % 60 === 0){
    nuvem = createSprite(600, 100, 40, 10);
    nuvem.addImage(nuvem_imagem);
    nuvem.y = Math.round(random(10,100));
    nuvem.scale = 0.7;
    nuvem.velocityX = -3; 

    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1; 
  }
}