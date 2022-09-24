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

//global vars
let ponto, pos, tpos, rd;
let fixed;
let walk;

// this.resizeTo(1000,700);

function setup() {

    // cnv = createCanvas(1000, 700);
    cnv = createCanvas(windowWidth, windowHeight);
    centerCanvas();

    //(coll_numb, row_numb, gutt_width, gutt_height, margin_width, margin_height)
    grid = new Grid(2, 2, 10, 20, 20, 30);
    // grid.make_rows(2);
    // grid.make_panel(0, width/2);
    grid.make_panels();


    background(220);

    // points to play with
    ponto = grid.make_Gpoint(200, 200);
    pos = grid.make_Gpoint(width / 2, height / 2);
    tpos = grid.make_Gpoint(25, 600);
    rd = grid.make_Gpoint(450, 323);
    walk = grid.make_Gpoint(0, 450);

    // a pvector
    fixed = createVector(width / 2, height / 2);
    debug("setup");

}

function draw() {

    background(220);
    grid.panels_draw();
    // ellipse(pos.gx, pos.gy, 10, 10);
    grid.make_panels();

    grid.doodle();

    // this point will be at center first, but 
    // will not keep its position relative 
    fill(0);
    stroke(0);
    ellipse(fixed.x, fixed.y, 10, 10);
    line(width / 2 - 30, height / 2, width / 2 + 30, height / 2);
    line(width / 2, height / 2 - 30, width / 2, height / 2 + 30);


    // this will always be at center 

    fill(200, 120, 110, 110);
    ellipse(pos.gx, pos.gy, 100, 100);


    //a circle path with no Gpoints involved...
    const ex = cos(radians(millis() / 10)) * 130;
    const ey = sin(radians(millis()) / 10) * 130;

    // But used referenced to a Gpoint
    // so the path will adapt to Window resizes
    // only position, not magnitude
    ellipse(pos.gx + ex, pos.gy + ey, 10, 10);


    // rect with pos fixed and width and height relatives
    // to window size, rd for rect dimensions
    rect(10, 10, rd.gx, rd.gy);

    // Here we use grids base points
    // perhaps a method for that?
    // this wil be always at center
    rectMode(CENTER);
    rect(grid.center.x, grid.center.y, rd.gx, rd.gy);
    fill(0, 0, 255);
    rect(pos.gx, pos.gy, 10, 10);
    fill(200, 120, 110, 110);
    rectMode(CORNER);


    // here we use update on the point as we are going ro animate it
    walk.update((millis() / 5) % width, null);
    rect(walk.gx, walk.gy, 20, 20);

    // using base points and props to calc a fixed distance
    // from grid 
    const h = grid.grid_h;
    const x = grid.base_points[3].x - 105;

    //this rect will have always same width
    // and adapt to window size
    // possible a menu bar
    rect(x, grid.base_points[1].y,  105 , h);


    // some text
    textSize(20);
    fill(20, 12, 11);
    text('I\'m not', 25, 570);

    // some adaptative text
    fill(200, 120, 110);
    text('I\'m adapting to  window size', tpos.gx, tpos.gy);
    fill(100, 70, 80);

    // using  'menu bar' coordinates
    // to atatch a text to it.
    textSize(15);
    text('_a menu item?', x, grid.base_points[1].y + 40);

}

function mousePressed() {

}


function windowResized() {
    // p5 resize
    resizeCanvas(windowWidth, windowHeight);
    // custom html hack
    centerCanvas();
    // grid resize and embeded points updates
    debug("before calc");
    grid.calc_grid();
    debug("after calc");
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