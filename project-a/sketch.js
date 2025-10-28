let scl = 20;
let inc = 0.1;
let zoff = 0;

let blobX = -1; // start "nonexistent"
let blobY = -1;
let blobSize = 0;
let growing = false;

let blobHue = 200;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 360, 100, 100, 255);
  background(0);
}


function draw() {
  fill(0, 20);
  rect(0, 0, width, height);
  drawFlowField();
  if (growing) {
    growMold(blobX, blobY);
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

      if (dist(px, py, blobX, blobY) < blobSize * 2) {
        xoff += inc;
        continue;
      }

      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
      let x2 = px + cos(angle) * scl;
      let y2 = py + sin(angle) * scl;

      stroke(blobHue, 60, 100, 30);
      line(px, py, x2, y2);

      xoff += inc;
    }
    yoff += inc;
  }

  zoff += map(mouseX, 0, width, 0.001, 0.009);
}

function growMold(x, y) {
  if (x < 0) return; // blob doesn't exist yet

  let reachedWall =
    x - blobSize <= 0 ||
    x + blobSize >= width ||
    y - blobSize <= 0 ||
    y + blobSize >= height;

  if (!reachedWall) {
    blobSize += 0.25;
  }

  noStroke();

  for (let r = blobSize; r > 10; r -= 3) {
    let alpha = map(r, 0, blobSize, 200, 10);
    fill(blobHue, 70, 100, alpha);

    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.15) {
      let nr = r + noise(cos(a)*0.8 + frameCount*0.01, sin(a)*0.8) * 10;
      let sx = x + cos(a) * nr;
      let sy = y + sin(a) * nr;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  let pointCount = blobSize * 8;
  for (let i = 0; i < pointCount; i++) {
    let ang = random(TWO_PI);
    let rad = random(blobSize * 0.95);
    let jitter = sin(frameCount * 0.05 + ang) * 2;

    let px = x + cos(ang) * (rad + jitter);
    let py = y + sin(ang) * (rad + jitter);

    fill(blobHue + 30, 80, 100, 200);
    ellipse(px, py, 2.5, 2.5);
  }

  noFill();
  stroke(blobHue, 70, 100, 40);
  circle(x, y, blobSize * 3);
}

function mousePressed() {
  if (blobX < 0) {
    // first time click, create blob
    blobX = mouseX;
    blobY = mouseY;
    blobSize = 10;
    blobHue = random(0, 360);
    growing = true;
  } else {
    let d = dist(mouseX, mouseY, blobX, blobY);
    if (d < blobSize * 1.2) {
      // clicked on existing blob → shrink & color shift
      blobSize *= 0.8;
      blobHue = random(0, 360);
    }
    // else: click elsewhere does nothing
  }
}
