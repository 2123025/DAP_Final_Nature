class Square extends Shape {

  constructor(x, y, size){
    super(x, y, size);
  }

  makeBody(x, y, size) {
    super.makeBody(x, y, size);

    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    let fd = new box2d.b2FixtureDef();
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.size), scaleToWorld(this.size));
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    this.body = world.CreateBody(bd);
    this.body.CreateFixture(fd);

    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-3, 3));
  }

  display() {

    let pos = scaleToPixels(this.body.GetPosition());
    let a = this.body.GetAngleRadians();

    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(220);
    noStroke();

    rect(0, 0, this.size * 2 - 3 , this.size * 2 - 3);
    pop();
  }
}
