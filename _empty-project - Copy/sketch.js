let fireworks=[]
let num=100;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < num; i++) {
    fireworks.push(new Firework(width/2, height/2));
  }
}

function draw() {
  background(0);
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    fireworks[i].display();
  }

  if (mouseIsPressed) {
    fireworks.push(new Firework(mouseX, mouseY));
  }

  if (fireworks.length > num) {
    fireworks.splice(0, fireworks.length - num);
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    let byeFirework = fireworks[i];
    if (byeFirework.isOutside) {
      fireworks.splice(i, 1);
    }
  }

  fill(255);
  text(fireworks.length, 10, 20);
}

class Firework {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    this.hue = random(0, 360);

    this.speedX = random(-3, 3);
    this.speedY = random(-1, -3);

    this.isOutside = false;
  }
  update() {

    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.1; // gravity effect
    this.speedX *= 0.99; // air resistance

  }
  display() {

    push();
    translate(this.x, this.y);

    colorMode(HSB)
    fill(this.hue, 80, 100)
    noStroke();
    circle(0, 0, this.size);

    pop();
  }

  edgeCheck() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.isOutside = true;
    }
  }
}