let tela = new p5((p) => {
  let now = 0.0;


  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(235, 178, 222);
    now = p.millis();
  }


  p.draw = () =>{

    //p.background(235, 178, 222);
    p.fill(51,51);
    p.noStroke();
    
    if(p.millis() - now > 2000){
        p.ellipse(p.random(p.width), p.random(p.height), 60, 60);
        now = p.millis();
      }
  }


  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(235, 178, 222);
  }

}, 'display');