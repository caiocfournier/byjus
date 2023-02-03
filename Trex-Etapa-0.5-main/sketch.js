 var trex, trex_correndo;
 var chao, chao_imagem, chao_invisivel;
 var nuvem, nuvem_imagem;
 var obstaculo, obstaculo1, obstaculo2, obstaculo3,
 obstaculo4, obstaculo5, obstaculo6;

 function preload(){
  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  chao_imagem = loadImage("ground2.png");
  nuvem_imagem = loadImage("cloud.png");

  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
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

 chao.velocityX = -6;

 if(chao.x < 0){
  chao.x = chao.width / 2;
 }


 if(keyDown("space") && trex.y >= 100){
   trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.5;
  trex.collide(chao_invisivel);

  criarNuvens();
  criarObstaculos();
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
    
    nuvem.lifetime = 200;

    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1; 
  }
 }

 function criarObstaculos(){
  if(frameCount % 60 === 0){
    obstaculo = createSprite(400, 165, 10, 40);
    obstaculo.velocityX = -6;
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }

    obstaculo.scale = 0.5;
    obstaculo.lifetime = 100;
  }
 }  