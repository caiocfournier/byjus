var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieImg2;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie-walking.gif")
  zombieImg2 = createImg("assets/zombie-walking.gif");

  bgImg = loadImage("assets/bg-jogo.jpg")

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.1;
  
  //criando o sprite do jogador
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle",0,0,300,300)

  //criando sprites para representar vidas restantes
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4

  //criando grupo de zumbis 
  zombieGroup = new Group();
}

function draw() {
  background(0); 

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30
  }

  //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
  if(keyWentDown("space")){
    player.addImage(shooter_shooting);
  }

  //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
  }

  //destrua o zumbi qunado o jogador tocar
  if(zombieGroup.isTouching(player)){
    for(var i=0;i<zombieGroup.length;i++){     

      if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy();
      } 
    }
  }

  //chame a função para gerar zumbis
  enemy();
  drawSprites();
}



//criando função para gerar zumbis
function enemy(){
  if(frameCount%50===0) {
    //dando posições x e y aleatórias para o zumbi aparecer
    zombie = createSprite(random(500,1100),random(100,500),40,40);
    zombie2 = createSprite(random(500,1100),random(100,500),40,40);

    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    zombie.debug= true;
    zombie.setCollider("rectangle",0,0,400,400);

    /*zombie2.addImage(zombieImg2);
    zombie2.scale = 0.15;
    zombie2.velocityX = -3;
    zombie2.debug= true;
    zombie2.setCollider("rectangle",0,0,400,400);*/
   
    zombie.lifetime = 400;
    zombieGroup.add(zombie);

    //zombie2.lifetime = 400;
    //zombieGroup.add(zombie2);
  }

}
