class CanhaoBola {
    constructor(x, y) {
        var opitions = {
            isStatic: true
        };
        this.r = 30;
        this.speed = 0.05
        this.body = Bodies.circle(x, y, this.r, opitions);
        this.image = loadImage("assets/cannonball.png");
        this.trajectory = [];
        World.add(world, this.body);
    }

    remove(index) {
        Matter.Body.setVelocity(this.body, {
            x: 0,
            y: 0
        });

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
        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.r, this.r);
        pop();

        if (this.body.velocity.x > 0 && pos.x > 10) {
            var posicao = [pos.x, pos.y];
            this.trajectory.push(posicao);
        }
        for (var i = 0; i < this.trajectory.length; i++) {
            image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }
    }
}
