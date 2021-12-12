class Circle {

  constructor(x, y, size){
    this.makeBody(x, y, size);
  }

  makeBody(x, y, size) {

    this.x = x;
    this.y = y;
    this.size = size;

    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Define fixture #2
    let fd = new box2d.b2FixtureDef();
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(size);
    let offset = scaleToWorld(new box2d.b2Vec2(0, 0));
    fd.shape.m_p = new box2d.b2Vec2(offset.x, offset.y);
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fd);

    // Some additional stuff
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));
  }

  display() {
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);

    ellipse(0, 0, this.size * 2, this.size * 2);
    pop();
  }
}
