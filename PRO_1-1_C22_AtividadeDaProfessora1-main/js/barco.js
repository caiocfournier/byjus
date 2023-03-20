class Barco {
    constructor(x, y, w, h, barcoPos){
        this.body = Bodies.rectangle(x, y, w, h);
        this.w = w;
        this.h = h;

        this.image = loadImage("assets/boat.png");
        this.barcoPosition = barcoPos;
        World.add(world, this.body);
    }

    display(){
        var angulo = this.body.angle;
        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        rotate(angulo);
        imageMode(CENTER);
        image(this.image, 0, this.barcoPosition, this.w, this.h);
        pop();
    }
}