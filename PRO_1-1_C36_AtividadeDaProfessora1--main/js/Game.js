class Game {
    constructor() {
        this.leadeboardTitle = createElement("h2");
        this.leader1 = createElement("h2");
        this.leader2 = createElement("h2");
        this.playerMoving = false;
        this.leftKeyActive = false;
    }

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

        fuels = new Group();
        powerCoins = new Group();
        obstacles = new Group();

        var obstaclesPositions = [
            {
                x: width / 2 + 250,
                y: height - 800,
                image: obstacle2Image
            },
            {
                x: width / 2 - 150,
                y: height - 1300,
                image: obstacle1Image
            },
            {
                x: width / 2 + 250,
                y: height - 1800,
                image: obstacle1Image
            },
            {
                x: width / 2 - 180,
                y: height - 2300,
                image: obstacle2Image
            }, {
                x: width / 2,
                y: height - 2800,
                image: obstacle2Image
            }, {
                x: width / 2 - 180,
                y: height - 3300,
                image: obstacle1Image
            }, {
                x: width / 2 + 180,
                y: height - 3300,
                image: obstacle2Image
            }, {
                x: width / 2 + 250,
                y: height - 3800,
                image: obstacle2Image
            }, {
                x: width / 2 - 150,
                y: height - 4300,
                image: obstacle1Image
            }, {
                x: width / 2 + 250,
                y: height - 4800,
                image: obstacle2Image
            }, {
                x: width / 2,
                y: height - 5300,
                image: obstacle1Image
            }, {
                x: width / 2 - 180,
                y: height - 5500,
                image: obstacle2Image
            }
        ];
        this.addSprites(fuels, 4, fuelImage, 0.02);
        this.addSprites(powerCoins, 18, powerCoinImage, 0.09);
        this.addSprites(obstacles, obstaclesPositions.length, obstacle1Image, 0.04, obstaclesPositions);
    }

    handleElement() {
        form.hide();
        form.titleImg.position(40, 50);
        form.titleImg.class("gameTitleAfterEffect");

        this.leadeboardTitle.html("Placar");
        this.leadeboardTitle.class("resetText");
        this.leadeboardTitle.position(width / 3 - 60, 40);

        this.leader1.class("leadersText");
        this.leader1.position(width / 3 - 50, 80);

        this.leader2.class("leadersText");
        this.leader2.position(width / 3 - 50, 130);
    }

    play() {
        this.handleElement();


        Player.getPlayersInfo();
        player.getCarsAtEnd();

        if (allPlayers !== undefined) {
            image(track, 0, -height * 5, width, height * 6);
            this.showFuelBar();
            this.showLife();
            this.showLeaderboard();

            var index = 0
            for (var p in allPlayers) {
                index += 1;

                var x = allPlayers[p].positionX;
                var y = height - allPlayers[p].positionY;

                cars[index - 1].position.x = x;
                cars[index - 1].position.y = y;

                if (index === player.index) {
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);

                    this.handleFuel(index);
                    this.handlePowerCoins(index);
                    this.handleObstaclesCollision(index);
                    camera.position.y = cars[index - 1].position.y;
                }
                this.playerControl();
                const finshLine = height * 6 - 100;

                if (player.positionY > finshLine) {
                    gameState = 2;
                    player.rank += 1;
                    Player.updateCarsAtEnd(player.rank);
                    player.update();
                    this.showRank();
                }
            }
            drawSprites();

        }
    }
    showLeaderboard() {
        var leader1,
            leader2;
        var players = Object.values(allPlayers);
        if (players[0].rank === 0 && players[1].rank === 0 || players[0].rank === 1) {
            leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
            leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
        }
        this.leader1.html(leader1);
        this.leader2.html(leader2);
    }
    playerControl() {
        if (keyIsDown(UP_ARROW)) {
            this.playerMoving = true;
            player.positionY += 10
            player.update()
        }
        if (keyIsDown(RIGHT_ARROW) && player.positionX<width/2 + 300){
            this.leftKeyActive = false;
            player.positionX += 6
            player.update()
        }
        if(keyIsDown(LEFT_ARROW)&& player.positionX> width / 2 - 300) {
            this.leftKeyActive = true;
            player.positionX -= 6
            player.update()
        }
    }
    addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
        for (var i = 0; i < numberOfSprites; i++) {
            var x,
                y;

            if (positions.length > 0) {
                x = positions[i].x;
                y = positions[i].y;
                spriteImage = positions[i].image;
            } else {
                x = random(width / 2 + 150, width / 2 - 150);
                y = random(-height * 4.5, height - 400);

            }

            var sprite = createSprite(x, y);
            sprite.addImage("sprite", spriteImage);

            sprite.scale = scale;
            spriteGroup.add(sprite);
        }
    }
    handleFuel(index) {
        cars[index - 1].overlap(fuels, function (collector, collected) {
            player.fuel = 185;
            collected.remove();
        });
        if (player.fuel > 0 && this.playerMoving) {
            player.fuel -= 0.3;
        }
    }

    handlePowerCoins(index) {
        cars[index - 1].overlap(powerCoins, function (collector, collected) {
            player.score += 21;
            player.update();
            collected.remove();
        });
    }
    showRank() {
        swal({
            title: `Incrivel! ${"/n"}${
                player.rank
            }º lugar`,
            text: "você alcançou a linha de chegada com sucesso!",
            imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
            imageSize: "100x100",
            confirmButtonText: "ok"
        });
    }

    gameOver() {
        swal({
            title: `fim de jogo`,
            text: "ops você perdeu a corrida",
            imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
            imageSize: "100x100",
            confirmButtonText: "obrigado por jogar"
        });
    }

    end(){
        console.log("fim de jogo");
    }

    showLife() {
        push();
        image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
        fill("white");
        rect(width / 2 - 100, height - player.positionY - 400, 185, 20);
        fill("#f50057");
        rect(width / 2 - 100, height - player.positionY - 400, player.life, 20);
        noStroke();
        pop();
    }

    showFuelBar() {
        push();
        image(fuelImage, width / 2 - 130, height - player.positionY - 350, 20, 20);
        fill("white");
        rect(width / 2 - 100, height - player.positionY - 350, 185, 20);
        fill("#ffc400");
        rect(width / 2 - 100, height - player.positionY - 350, player.fuel, 20);
        noStroke();
        pop();
    }

    handleObstaclesCollision(index) {
        if (cars[index - 1].collide(obstacles)) {
            if (this.leftKeyActive) {
                players.positionX += 100;
            } else {
                players.positionX += 100;
            }
            if (players.life > 0) {
                players.life -= 185 / 4;
            }
            players.update();
        }
    }
}
