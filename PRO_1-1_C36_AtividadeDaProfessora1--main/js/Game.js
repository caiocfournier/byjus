class Game {
    constructor() {}

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        });
    }

    update(state) {
        database.ref("/").update({gameState: state});
    }
    start() {
        player = new Player();
        playerCount = player.getCount()
        form = new Form();
        form.display();

        car1 = createSprite(width / 2 - 100, height - 100);
        car1.addImage("car1", car1_img);
        car1.scale = 0.07;

        car2 = createSprite(width / 2 + 100, height - 100);
        car2.addImage("car2", car2_img);
        car2.scale = 0.07;

        cars = [car1, car2];
    }

    handleElement() {
        form.hide();
        form.titleImg.position(40, 50);
        form.titleImg.class("gameTitleAfterEffect");
    }

    play() {
        this.handleElement();


        Player.getPlayersInfo();

        if (allPlayers !== undefined) {
            image(track, 0, -height * 5, width, height * 6);
            var index = 0
            for (var p in allPlayers) {
                index += 1
             //continuar o codigo para mover os carros na posição x e y   
            }
            drawSprites();
            this.playerControl()
        }
    }
    playerControl() {
        if (keyIsDown(UP_ARROW)) {
            player.positionY += 10
            player.update()
        }
        if (keyIsDown(RIGHT_ARROW) && player.positionX<width/2 + 300){
            player.positionX += 6
            player.update()
        }
        if(keyIsDown(LEFT_ARROW)&& player.positionX> width / 2 - 300) {
            player.positionX -= 6
            player.update()
        }
    }
}
