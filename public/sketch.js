'use strict';
let grid;

let cnv;
//DOM: centering canvas on screen 
function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

let ponto, pos, tpos, rd;
let fixed;
let walk;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    centerCanvas();

    //(coll_numb, row_numb, gutt_width, gutt_height, left_margin, margin_height )
    grid = new Grid(12, 3, 10, 20, 0, 30);


    background(220);
    //grid.calc_grid();
    ponto = grid.make_Gpoint(200, 200);
    pos = grid.make_Gpoint(width / 2, height / 2);
    tpos = grid.make_Gpoint(25, 600);
    rd = grid.make_Gpoint(323, 323);
    fixed = createVector(width/2, height/2);
    walk = grid.make_Gpoint(0, 450, this);
    console.log(walk.this);

}

function draw() {

    background(220);
    // grid.doodle();

    fill(0);
    ellipse(fixed.x, fixed.y, 10, 10);
    fill(200, 120, 110, 110);

    ellipse(pos.gx, pos.gy, 100, 100);

    const ex = cos(radians(millis() / 10)) * 130;
    const ey = sin(radians(millis()) / 10) * 130;

    ellipse(pos.gx + ex, pos.gy + ey, 10, 10);


    rect(10, 10, rd.gx, rd.gy);
    rect(grid.center.x, grid.center.y, rd.gx, rd.gy); 

   	walk.update((millis()/5)%width, walk.gy, grid);
    rect(walk.gx, walk.gy, 20,20);

    const h = grid.base_points[3].y - grid.base_points[1].y; 
    const x = grid.base_points[3].x - 85;

    rect(x, grid.base_points[1].y, 85, h); 

   	
    fill(20, 12, 11);
    text('I\'m not', 25, 570);
    fill(200, 120, 110);
    text('I\'m adapting to  window size', tpos.gx, tpos.gy);
    fill(100, 70, 80);
    text('_a menu item?', x, grid.base_points[1].y +  40);

}

function mousePressed() {

}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    centerCanvas();
    background(220);
    grid.calc_grid();
}