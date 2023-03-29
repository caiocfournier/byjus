class Barco {
    constructor(x, y, w, h, barcoPos, barcoAnimation) {
        this.animation = barcoAnimation;
        this.speed = 0.05;
        this.body = Bodies.rectangle(x, y, w, h);
        this.w = w;
        this.h = h;

        this.image = loadImage("assets/boat.png");
        this.barcoPosition = barcoPos;
        World.add(world, this.body);
    }

    remove(index) {
        this.animation = quebradoBarcoAnimacao;
        this.speed = 0.05;
        this.w = 300;
        this.h = 300;
        this.isBroken = true;
        setTimeout(() => {
            Matter.World.remove(world, barcos[index].body);
            delete barcos[index];
        }, 2000);
    }
    animate() {
        this.speed += 0.05;
    }

    display() {
        var angulo = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.animation.length);
        push();
        translate(pos.x, pos.y);
        rotate(angulo);
        imageMode(CENTER);
        image(this.animation[index], 0, this.barcoPosition, this.w, this.h);
        pop();
    }
}
