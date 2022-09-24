'use strict';
//The singleton instance
let grid;
let cnv;

//DOM: centering canvas on screen 
function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function setup() {
    // cnv = createCanvas(1000, 700);
    cnv = createCanvas(windowWidth, windowHeight);
    centerCanvas();


    //(coll_numb, row_numb, gutt_width, gutt_height, margin_width, margin_height)
    grid = new Grid(3, 3, 10, 20, 20, 30);
    grid.calc_grid();

    background(220);

    // points to play with

    // debug("setup");
}

function draw() {
    background(220);

    if (keyIsPressed) {
        grid.doodle();
        grid.panels_draw();
    }
}//draw

function mousePressed() {

}


function windowResized() {
    // p5 resize
    resizeCanvas(windowWidth, windowHeight);
    // custom html hack
    centerCanvas();
    // grid resize and embeded points updates
    // debug("before calc");
    grid.calc_grid();
    // debug("after calc");
}



function debug(msg) {
    console.log(`
    -${msg}
    width = ${width}
    height= ${height}
    grid_w =${grid.grid_w}
    grid_h =${grid.grid_h} 
    width/2 = ${width/2}
    height/2= ${height/2}
    grid_cx =${grid.center.x}
    grid_cy =${grid.center.y} 
    pos.gx = ${pos.gx}
    pos.gy = ${pos.gy}
    ratio_x = ${pos.ratio_x}
    ratio_x = ${pos.ratio_y}
    `);
    console.log(grid.panels);
}