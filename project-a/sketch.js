let scl = 20;
let inc = 0.1;
let zoff = 0;

let blobX = 0;
let blobY = 0;
let blobSize = 0;
let growing = false;
let dragging = false;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    background(0);
}

function draw() {
  // gentle fade to keep those flowy trails
  fill(0, 20);
  rect(0, 0, width, height);

  drawFlowField();

  if (growing) {
    growMold(blobX, blobY);
  }

  // erase only inside the glow zone
  if (growing) {
    erase(1, 0);
    noStroke();
    circle(blobX, blobY, blobSize * 2.4);
    noErase();
  }

  // dragging makes blob follow da mouse
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

      if (dist(px, py, blobX, blobY) < blobSize *2) {
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

  // mouse kinda affects background flow speed
  zoff += map(mouseX, 0, width, 0.001, 0.01);
}

function mousePressed() {
  // if clicking near blob → drag
  let d = dist(mouseX, mouseY, blobX, blobY);
  if (d < blobSize * 1.2) {
    dragging = true;
  } else {
    // otherwise spawn a new blob
    blobX = mouseX;
    blobY = mouseY;
    blobSize = 5;
    growing = true;
  }
}

function mouseReleased() {
  dragging = false;
}

function growMold(x, y) {
  noStroke();

  // stop growing when hitting canvas edges
  let reachedWall = (x - blobSize <= 0 ||
                     x + blobSize >= width ||
                     y - blobSize <= 0 ||
                     y + blobSize >= height);

  if (!reachedWall) {
    blobSize += 0.15; // still growing
  }

  // gooey layered circles
  for (let r = blobSize; r > 0; r -= 3) {
    let alpha = map(r, 0, blobSize, 180, 20);
    fill(100, 200, 255, alpha);
    circle(x, y, r * 2 + sin(frameCount * 0.05) * 4);
  }

  // outer glow aura
  noFill();
  stroke(120, 200, 255, 40);
  circle(x, y, blobSize * 3.5);
}
