
export function test(){
let x = 100;
let y = 100;

sketch.setup = () => {
  sketch.createCanvas(200, 200);
};

sketch.draw = () => {
  sketch.background(0);
  sketch.fill(255);
  sketch.rect(x,y,50,50);
};

};
