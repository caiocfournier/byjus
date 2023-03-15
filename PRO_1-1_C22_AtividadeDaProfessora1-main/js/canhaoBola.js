class CanhaoBola {
    constructor(x, y) {
        var opitions = {
            isStatic: true
        };
        this.r = 30;
        this.body = Bodies.circle(x, y, this.r, opitions);
        this.image = loadImage("assets/cannonball.png");
        this.trajetoria = [];
        World.add(world, this.body);
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
    

    for (var i = 0; i< this.trajetoria.length; i++){
      image(this.image, this.trajetoria[i][0], this.trajetoria[i][1], 5, 5);
    }
  }
}