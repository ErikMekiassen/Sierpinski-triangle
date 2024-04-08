
const canvasX = 720;
const canvasY = 600;
const offsettX = canvasX / 6;
let initialTriangleObject = [{"x": offsettX, "y": canvasY / 1.2}];
function setup() {
  createCanvas(canvasX, canvasY);
  noStroke();
  frameRate(30);
  ellipseMode(RADIUS);
  
  background(102);
  
  stroke('purple');
  strokeWeight(1);
  const triangle = initialTrianglePoints(initialTriangleObject)
  printLinesBetweenTrianglePoints(triangle)
  TheChaosGame(triangle, 50000)
  
}
function draw() {
}

function TheChaosGame(triangle, runs) {
  let previouspoint = randomPointInsideTriangle(triangle);

  stroke(255, 0, 0);
  strokeWeight(10);
  point(previouspoint.x, previouspoint.y);
  stroke('purple');
  strokeWeight(1);

  console.log("chaos", previouspoint.x, previouspoint.y);
  for (let i = 0; i < runs; i++) {
    previouspoint = calculateNextPoint(triangle, previouspoint)
    console.log("bla", previouspoint.x, previouspoint.y);
    point(previouspoint.x, previouspoint.y);
  }
}

function calculateNextPoint(triangle, vertex) {
  let edgeIndex = Math.floor(Math.random() * triangle.length);
  console.log("edgeIndex", edgeIndex);
  let x = (triangle[edgeIndex].x + vertex.x) / 2;
  let y = (triangle[edgeIndex].y + vertex.y) / 2;
  console.log("calculateNextPoint", x, y);
  return {"x": x, "y": y};
}

function randomPointInsideTriangle(triangle){
  let x = Math.random().toFixed(3) * 1000;
  let y = Math.random().toFixed(3) * 1000;

  while(!checkIfPointIsInsideTriangle(triangle, x, y)) {
    x = Math.random().toFixed(3) * 1000;
    y = Math.random().toFixed(3) * 1000;
  }

  return {"x": x, "y": y};
}

function checkIfPointIsInsideTriangle(triangle, x, y) {
  if (
    x > triangle[0].x && x < triangle[1].x &&
    y < triangle[0].y && y > triangle[2].y
  ) {
    return true;
  } else {
    return false;
  }
}

function initialTrianglePoints(points) {
  let startX = points[0].x
  let startY = points[0].y
  points.push({"x": canvasX / 1.2, "y": startY})
  const middle = points[0].x / 2+ points[1].x / 2
  console.log(points[0].x - offsettX);
  console.log(middle);
  points.push({"x": middle, "y": canvasY / 1.2 - middle})
  
  return points
}

function printLinesBetweenTrianglePoints(points) {
  console.log(true);
  
  for (let i = 0; i < points.length; i++) {
    if (points[i + 1] !== undefined) {
      console.log(true);
      line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    } else {
      line(points[i].x, points[i].y, points[0].x, points[0].y);
    }
  }
}
