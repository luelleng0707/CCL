/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new LuellalalalDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class LuellalalalDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.originalY = startY;
    // add properties for your dancer here:
    // animation / state properties from the provided snippet
    this.w = 10; // eye width
    this.h = 20; // eye height
    this.clap = 10; // clap offset for clingy animation
    this.mode = 'sad'; // sad, clingy, or tickled
    // ensure a slower frame rate for this dancer's animation
    frameRate(5);
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour

    //auto blink function
    if (frameCount % 5 == 0) {
      this.h = this.h - 25;
      this.w = this.w + 10;
      this.y -= 10;
    } else {
      this.w = 10;
      this.h = 20;
      this.y = this.originalY;
    }
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    // We'll adapt the provided sketch code so it lives inside this dancer
    // Draw in a local coordinate system that matches the original snippet
    // The original coordinates were centered around x=250,y=250; translate
    // back by 250 so we can reuse the values, then scale down slightly so
    // the whole dancer fits within ~200x200 as required by the exercise.
    push();
    // center the original snippet around the dancer origin
    translate(-200, -200);
    // scale to fit within 200x200 (approx). Original width ~300, so scale ~0.66
    scale(0.66);

  // background blob and general styling (local to the dancer)
  noStroke();
  // (global background is used by the sketch) — removed the local dark-red rect
    // -------------------------
    // LAYER 1: HAIR 
    // -------------------------
    fill('#2C222B');
    noStroke();
    ellipse(250, 240, 200, 120);
    ellipse(190, 300, 36, 36);
    ellipse(190, 330, 28, 28);
    ellipse(310, 300, 36, 36);
    ellipse(310, 330, 28, 28);

    // -------------------------
    // FACE
    fill('#FFEAEA');
    ellipse(250, 250, 160, 130);
    
    // hat
    fill('#F6AD55');
    stroke('#111111');
    strokeWeight(5);
    triangle(100, 230, 400, 230, 250, 110);


    // string
    stroke('#111111');
    strokeWeight(6);
    noFill();
    arc(250, 230, 240, 165, 0, PI);

    // --- Body ---
    fill('#E53E3E');
    rectMode(CENTER);
    noStroke();
    rect(250, 370, 120, 140, 25);
    
    //Animations
    // laughing mouth
    fill('#a7201a');
    arc(250, 265, 40, 20, 0, PI);
    line(230, 265, 270, 265);

    // Eyes smiley
    stroke(0);
    strokeWeight(5);
    noFill();
    arc(220, 250, 40, 20, PI, TWO_PI); // left eye  
    arc(280, 250, 40, 20, PI, TWO_PI); // right eye

    // belly rub
    let rub = 40;
    fill('#ffeaea');
    noStroke();
    if (frameCount % 2 == 0) {
      ellipse(150, 360 - rub, 30, 30);
      ellipse(350, 360 + rub, 30, 30);
    } else {
      ellipse(150, 360 + rub, 30, 30);
      ellipse(350, 360 - rub, 30, 30);
    }

    pop();

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.

    pop();
  } 
} // end of dancer class