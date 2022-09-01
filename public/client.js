






  let tela = new p5((p) => {
    let now = 0.0;
    let nod_1;
    let cam = {};
    let du = true;

    p.setup = () => {
      let canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      canvas.position(0, 0);
      canvas.style('z-index', '1');
      cam = p.createEasyCam({distance : 320});
    //offsetCanvas(cam,0,0);
    // p.background(235, 178, 222);
    now = p.millis();
    p.debugMode();

    //document.oncontextmenu = ()=>false;

    nod_1 = new Nodulo(50, 0, 0, 30);
    nod_2 = new Nodulo(0,100, 0, 30);


  }


  p.draw = () =>{
    // p.background(235, 178, 222,100);
    p.ambientLight(235,178,222);
    // p.orbitControl();
    //p.background(235, 178, 222);
    nod_1.display();
    nod_2.display();
    if(du)console.log("r= " + nod_1.r.x);
    du=false;
    // nod_2.display();
    // p.box(200);

    
  }//\\draw


  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.background(235, 178, 222);
  }

class Nodulo {
   r = {};
  constructor(px, py, pz, sz){
    this.px = px;
    this.py = py;
    this.pz = pz;
    this.sz = sz;
  }

  display(){
    p.push();
    p.translate(this.px, this.py, this.pz);
      // p.box(this.sz, this.sz/2, 3 );
      p.box(60, this.sz/2, 3 );
      p.pop();
       this.r = {x: this.px, y: this.py};
    }

  }

  

});
