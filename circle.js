class Circle extends Shape {

  constructor(x, y, size){
    super(x, y, size);
  }

  makeBody(x, y, size) {

    super.makeBody(x, y, size);

    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    let fd = new box2d.b2FixtureDef();
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(size);
    let offset = scaleToWorld(new box2d.b2Vec2(0, 0));
    fd.shape.m_p = new box2d.b2Vec2(offset.x, offset.y);
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    this.body = world.CreateBody(bd);
    this.body.CreateFixture(fd);

    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));
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

    ellipse(0, 0, this.size * 2, this.size * 2);
    pop();
  }
}
