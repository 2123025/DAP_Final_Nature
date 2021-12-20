class Triangle extends Shape {

  constructor(x, y, size){
    super(x, y, size);
  }

  makeBody(x, y, size) {

    super.makeBody(x, y, size);

    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    let fd = new box2d.b2FixtureDef();

    let vertices = [];
    vertices[2] = scaleToWorld(0 , size);
    vertices[1] = scaleToWorld(-size, -size);
    vertices[0] = scaleToWorld(size, -size);

        // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsArray(vertices, vertices.length);

    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    this.body = world.CreateBody(bd);
    this.body.CreateFixture(fd);

    //this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    //this.body.SetAngularVelocity(random(-3, 3));
  }

  display() {
    let pos = scaleToPixels(this.body.GetPosition());
    let a = this.body.GetAngleRadians();

    let f = this.body.GetFixtureList();
    let ps = f.GetShape();

    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(220);
    noStroke();
    beginShape();

    for (let i = 0; i < ps.m_count; i++) {
      let v = scaleToPixels(ps.m_vertices[i]);
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
  }
}
