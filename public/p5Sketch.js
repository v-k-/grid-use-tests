//import test from "test.js";

let myp5 = new p5(( sketch ) => {

  
},
'domId');

let instance_1 = new p5((p) => {


  p.setup = () =>{
   p.createCanvas(200, 100);
   p.background(235,178,222);


}

}, 'domId2');

// function setup() {
//   createCanvas(windowWidth, windowHeight, WEBGL);

// }

// function draw() {
//   background(255);
//   lights();
//   orbitControl();
//   fill(200,0,200);
//   rect(-windowWidth/2, -windowHeight/2, 200, 200);
//   fill(100,100,200);
//   rect(0, 0, 150, 150);

//   push();
//   translate(0,0,)
//   translate(p5.Vector.fromAngle(millis() / 1000, 300));
//   noStroke();
//   ambientMaterial(200);
//   sphere(100);
//   pop();

// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }