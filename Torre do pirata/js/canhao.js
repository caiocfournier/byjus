class Canhao {
    constructor(x, y, w, h, angulo) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angulo = angulo;
        this.canhaoImg = loadImage("assets/canon.png");
        this.canhaoBase = loadImage("assets/cannonBase.png");
    }
    display() {
        if (keyIsDown(RIGHT_ARROW) && this.angulo < 70) {
            this.angulo += 1;
        }
        if (keyIsDown(LEFT_ARROW) && this.angulo > -30) {
            this.angulo -= 1;
        }

        push();
        translate(this.x, this.y);
        rotate(this.angulo);
        imageMode(CENTER);
        image(this.canhaoImg, 0, 0, this.w, this.h);
        pop();

        image(this.canhaoBase, 70, 20, 200, 200);
        noFill();
    }
}
