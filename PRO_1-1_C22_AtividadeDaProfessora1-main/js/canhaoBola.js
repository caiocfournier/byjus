class CanhaoBola {
    constructor(x, y){
      var opitions = {
          isStatic: true   
      };
      this.r = 30;
      this.body = Bodies.circle(x, y, this.r, opitions);
      this.image = loadImage("assets/cannonball.png");
      World.add(world,this.body);  
    }

    display(){
     var pos = this.body.position;
     push();
     imageMode(CENTER);
     image(this.image, pos.x, pos.y, this.r, this.r);
     pop();
    }
}