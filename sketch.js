let world;

let boundaries = [];
let polygons = [];

function setup() {
  createCanvas(800, 800);
  world = createWorld();

  boundaries.push(new Boundary(0, 0, width * 2, 10));
  boundaries.push(new Boundary(width, 0, 10, height * 2));
  boundaries.push(new Boundary(0, height, width * 2 - 10, 10));
  boundaries.push(new Boundary(0, 0, 10, height * 2));
}

function draw() {

  let size = 0;

  for (let i = polygons.length - 1; i >= 0; i--) {
    size += polygons[i].size / 20;
  }

  background(color(170 - size, 180 - size, 230 - size));

  let timeStep = 1.0 / 30;
  world.Step(timeStep, 10, 10);

  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  for (let i = polygons.length - 1; i >= 0; i--) {
    polygons[i].display();
  }
}

function mousePressed() {
  let cs = new Circle(mouseX, mouseY, random(15, 55));
  polygons.push(cs);
}
