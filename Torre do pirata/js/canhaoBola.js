class CanhaoBola {
    constructor(x, y) {
        var opitions = {
            isStatic: true
        };
        this.r = 30;
        this.speed = 0.05;
        this.body = Bodies.circle(x, y, this.r, opitions);
        this.image = loadImage("assets/cannonball.png");
        this.animation = [this.image];
        this.trajectory = [];
        this.isSink = false;
        World.add(world, this.body);
    }

    animar() {
        this.speed += 0.05;
    }

    remove(index) {
        this.isSink = true;
        Matter.Body.setVelocity(this.body, {
            x: 0,
            y: 0
        });

        this.animation = aguaAnimacao;
        this.speed = 0.05;
        this.r = 150;

        setTimeout(() => {
            Matter.World.remove(world, this.body);
            delete bolas[index];
        }, 1000);
    }

    atirar() {
        var novoAngulo = canhao.angulo - 28;
        novoAngulo = novoAngulo * (3.14 / 180);
        var velocidade = p5.Vector.fromAngle(novoAngulo)
        velocidade.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {
            x: velocidade.x * (180 / 3.14),
            y: velocidade.y * (180 / 3.14)
        });
    }
    display() {
        var angulo = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.animation.length);

        push();
        translate(pos.x, pos.y);
        rotate(angulo);
        imageMode(CENTER);
        image(this.animation[index], 0, 0, this.r, this.r);
        pop();

        if (this.body.velocity.x > 0 && pos.x > 10 && !this.isSink){
            var posicao = [pos.x, pos.y];
            this.trajectory.push(posicao);
        }
        for (var i = 0; i < this.trajectory.length; i++) {
            image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }
    }
}
