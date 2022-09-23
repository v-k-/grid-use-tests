'use strict';
class Grid {
    constructor(
        coll_numb,
        row_numb,
        gutt_width,
        gutt_height,
        margin_width,
        margin_height
    ) {

        // calc initial ratio based on margin width and window
        const ini_ratio = createVector();
        if (margin_width === 0) {
            ini_ratio.x = 1;
            return;
        } else {
            ini_ratio.x = margin_width / width;
        }

        if (margin_height === 0) {
            ini_ratio.y = 1;
            return
        } else {
            ini_ratio.y = margin_height / height;
        }

        // passed by vars
        this.coll_numb = coll_numb;
        this.row_numb = row_numb;
        this.gutt_width = gutt_width;
        this.gutt_height = gutt_height;
        this.left_margin = margin_width;
        this.margin_height = margin_height;
        //instances var
        this.center;
        this.grid_w;
        this.grid_h;
        //base points are the 4 corners p5Vectors
        this.base_points = [];
        //points made, those are getting update 
        this.made_points = []
            //for the abandoned for now column thinking
        this.w_slices = [];
        this.h_slices = [];

        //calc everything once
        //this populates those vars above like center and points[]
        this.calc_grid();

    }


    // The grid base is like this:
    //  // // // // // //
    // P0                 P1
    //
    //       center
    //
    // P2                 P3
    // // // // // // // // 

    // base calculations relative to window dimensions
    calc_grid() {
        let right_margin = width - this.left_margin;
        let bottom_margin = height - this.margin_height;
        const p0 = createVector(this.left_margin, this.margin_height);
        const p1 = createVector(right_margin, this.margin_height);
        const p2 = createVector(this.left_margin, bottom_margin);
        const p3 = createVector(right_margin, bottom_margin);
        this.center = createVector(p2.x / 2 + p3.x / 2, p1.y / 2 + p3.y / 2);
        this.base_points = [p0, p1, p2, p3];
        this.grid_w = this.base_points[1].x - this.base_points[0].x;
        this.grid_h = this.base_points[2].y - this.base_points[0].y;

        // the collumns thinking got paused for now
        // this.make_w_slices(this.coll_numb);
        // this.make_h_slices(this.row_numb);

        //update made_points[]
        this.gp_update();
    }

    // make collumns and return new collumn width
    make_w_slices(n) {
        const coll_width = this.grid_w / n;
        let acumulator = this.base_points[0].x;
        for (let i = 0; i < n; i++) {
            this.w_slices[i] = createVector(acumulator, this.base_points[0].y);
            acumulator += coll_width;
        }
        return coll_width;
    }

    // make rows and return new row width
    make_h_slices(n) {
        const row_width = this.grid_h / n;

        let acumulator = this.base_points[0].y;

        for (let i = 0; i < n; i++) {
            this.h_slices[i] = createVector(this.base_points[0].x, acumulator);
            acumulator += row_width;
        }
        return row_width;
    }


    // construct a Gpoint, add it to made_points for updates
    make_Gpoint(x = 0, y = 0) {

        // points outside the window won't be of any good...
        // yet to decide how to deal with it
        // an intrusive alert for now;
        if (x > width || y > height) {
            alert(`the Gpoint (${x}, ${y}) was created outside the window. Useless`)
        }

        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // the ratio between point x and y and grid width
        const rx = x / this.grid_w;
        const ry = y / this.grid_h; 

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // pass the singleton grid as a parameter
        //so the points can recalc ratio if animated in main sketch
        const gp = new Gpoint(x, y, rx, ry, this);

        //store the point
        this.made_points.push(gp);
        return gp;
    }

    // called when window is resized
    // recalc points based on stored ratio.
    gp_update() {
        for (const gp of this.made_points) {
            gp.gx = this.grid_w * gp.ratio_x + this.left_margin;
            gp.gy = this.grid_h * gp.ratio_y + this.margin_height;



        }
    }

    //yet to come
    make_row() {}

    // draw ref grid to debug and design
    doodle() {
        strokeWeight(1);
        stroke(0);
        noFill();

        //lines of margins and diagonals
        const p0 = this.base_points[0];
        const p1 = this.base_points[1];
        const p2 = this.base_points[2];
        const p3 = this.base_points[3];

        this.pvline(p0, p1);
        this.pvline(p0, p2);
        this.pvline(p0, p3);

        this.pvline(p1, p2);
        this.pvline(p1, p3);
        this.pvline(p2, p3);


        // draw center point
        ellipse(this.center.x, this.center.y, 7, 7);


        // draw base base_points at corners
        for (const p of this.base_points) {
            ellipse(p.x, p.y, 7, 7);
        }

        // draw base_points along top axis
        for (const t of this.w_slices) {
            ellipse(t.x, t.y, 3, 3);
        }

        // draw base_points along top axis
        for (const t of this.h_slices) {
            ellipse(t.x, t.y, 3, 3);
        }
        // draw base_points along top axis
        fill(255, 20, 20);

        for (const gp of this.made_points) {
            // ellipse(gp.gx, gp.gy, 3, 3);
        }


        //draw bg grid 
        strokeWeight(1);
        stroke(0, 50);
        for (let i = 0; i < width; i += 10) {
            line(i, 0, i, height);
        }

        for (let i = 0; i < height; i += 10) {
            line(0, i, width, i);
        }

    }

    //utility to unpack a p5Vector
    pvline(pv1, pv2) {
        line(pv1.x, pv1.y, pv2.x, pv2.y);
    }




} //class




//     console.log(`
// dx =  ${dx}
// dy =  ${dy}  
// gx = ${gp.gx}
// gy = ${gp.gy}
// `)