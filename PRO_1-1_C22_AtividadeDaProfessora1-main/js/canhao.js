class Canhao {
    constructor(x, y, w, h, angle) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = angle;
    }
    display() {
        push();
        imageMode(CENTER);
        image(this.x, this.y, this.w, this.h);
        pop();

        image(70, 20, 200, 200);
        noFill();
    }
}
