/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/
let scl = 20;
let inc = 0.1;
let zoff = 0;

let blobX = 0;
let blobY = 0;
let blobSize = 0;
let growing = false;
let dragging = false; // check if user’s holding blob

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    background(0);
}

function draw() {
  // smooth trail fade
  fill(0, 20);
  rect(0, 0, width, height);

  drawFlowField();

  if (growing) {
    growMold(blobX, blobY);
  }

  // drag movement logic
  if (dragging) {
    blobX = mouseX;
    blobY = mouseY;
  }
}

function drawFlowField() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  let yoff = 0;

  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let px = x * scl;
      let py = y * scl;

      // don’t draw too close to blob
      if (dist(px, py, blobX, blobY) < blobSize + 80) {
        xoff += inc;
        continue;
      }

      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
      let x2 = px + cos(angle) * scl;
      let y2 = py + sin(angle) * scl;

      stroke(80, 120, 255, 30);
      line(px, py, x2, y2);

      xoff += inc;
    }
    yoff += inc;
  }

  zoff += 0.005;
}

function mousePressed() {
  // if blob not yet active, spawn it
  if (!growing) {
    blobX = mouseX;
    blobY = mouseY;
    blobSize = 5;
    growing = true;
  }

  // start dragging if clicked near blob
  if (dist(mouseX, mouseY, blobX, blobY) < blobSize) {
    dragging = true;
  }
}

function mouseReleased() {
  dragging = false;
}

function growMold(x, y) {
  noStroke();

  // blob keeps expanding slowly
  blobSize += 0.15;

  // draw glowing core
  for (let r = blobSize; r > 0; r -= 3) {
    let alpha = map(r, 0, blobSize, 180, 20);
    fill(100, 200, 255, alpha);
    circle(x, y, r * 2 + sin(frameCount * 0.05) * 4);
  }

  // aura glow
  noFill();
  stroke(120, 200, 255, 30);
  circle(x, y, blobSize * 2.2);
}
