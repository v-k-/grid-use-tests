'use strict';
class Grid {
    constructor(
        // default to window dimensions
        col_numb = 1,
        row_numb = 1,
        gutt_width = 0,
        gutt_height = 0,
        margin_width = 0,
        margin_height = 0
    ) {
        // passed by vars
        this.col_numb = col_numb;
        this.row_numb = row_numb;
        this.gutt_width = gutt_width;
        this.gutt_height = gutt_height;
        // !!changing names!! ... not sure is such a good idea...
        this.left_margin = margin_width;
        this.top_margin = margin_height;

        //instances var
        this.center;
        this.grid_w;
        this.grid_h;
        //base points are the 4 corners p5Vectors
        this.base_points = [];
        //points made hold Gpoints created in main sketch, 
        this.made_points = []

        //collumns and rows
        this.col_w;
        this.row_h;
        this.columns = [];
        this.rows = [];

        // panels
        this.panels = [];

        //calc everything once
        //this populates those vars above like center and points[]
        this.calc_grid();

    }


    // The grid base is obviously like this:


    //                        //
    //  P0                 P1
    //                        //
    //         center
    //                        //
    //  P2                 P3
    //                        // 



    // base calculations relative to window dimensions
    calc_grid() {
        let right_margin = width - this.left_margin;
        let bottom_margin = height - this.top_margin;
        const p0 = createVector(this.left_margin, this.top_margin);
        const p1 = createVector(right_margin, this.top_margin);
        const p2 = createVector(this.left_margin, bottom_margin);
        const p3 = createVector(right_margin, bottom_margin);
        this.center = createVector(p2.x / 2 + p3.x / 2, p1.y / 2 + p3.y / 2);
        this.base_points = [p0, p1, p2, p3];
        this.grid_w = this.base_points[1].x - this.base_points[0].x;
        this.grid_h = this.base_points[2].y - this.base_points[0].y;

        //update made_points[]
        this.gp_update();

        //make rows and columns
        // this.make_columns(this.col_numb);
        // this.make_rows(this.row_numb);
        this.make_panels();

    }

    // construct a Gpoint, add it to made_points for updates
    make_Gpoint(x = 0, y = 0) {

        // points outside the window won't be of any good...
        // yet to decide how to deal with it
        // an intrusive alert for now;
        if (x > width || y > height || x < 0 || y < 0) {
            alert(`the Gpoint (${x}, ${y}) was created outside the window. Useless`)
        }

        // the ratio between point x and y and grid width
        let rx = (x - this.left_margin) / this.grid_w;
        let ry = (y - this.top_margin) / this.grid_h;
        // rx = rx ===0? 1:rx;
        // ry = ry ===0? 1:ry;
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
            gp.gy = this.grid_h * gp.ratio_y + this.top_margin;
        }
    }

    // //Calc columns, update col_number and col_w, (returns col_width?)
    // make_columns(n) {
    //     this.columns = [];
    //     const col_width = this.grid_w / n;

    //     let acumulator = this.base_points[0].x;

    //     for (let i = 0; i < n; i++) {
    //         this.columns[i] = createVector(acumulator, this.base_points[0].y);
    //         acumulator += col_width;
    //         // console.log ("c = " )
    //         // console.log (this.columns);
    //     }
    //     this.col_numb = n;
    //     this.col_w = col_width;
    //     return col_width;
    // }


    // //Calc rows, update row_number and row_h, (returns row_height?)
    // make_rows(n) {
    //     this.rows = [];
    //     const row_height = this.grid_h / n;

    //     let acumulator = this.base_points[0].y;

    //     for (let i = 0; i < n; i++) {
    //         this.rows[i] = createVector(this.base_points[0].x, acumulator);
    //         acumulator += row_height;
    //         // console.log (this.rows);
    //     }
    //     this.row_numb = n;
    //     this.row_h = row_height;
    //     return row_height;
    // }

    make_panels() {
        this.panels = [];
        let temp_points = new Map();;
        // this.rows = [];

        const col_width = this.grid_w / this.col_numb;
        const row_height = this.grid_h / this.row_numb;


        for (let i = 0; i <= this.col_numb; i++) {
            for (let j = 0; j <= this.row_numb; j++) {

                const x = i * col_width + this.left_margin;
                const y = j * row_height + this.top_margin;
                ellipse(x, y, 14);
                // ellipse(i * col_width + this.left_margin, j * row_height + this.margin_height, 10, 10);

                temp_points.set(`${i}${j}`, this.make_Gpoint(x, y));
                text(`${i}, ${j}`, x - 8, y + 24);

            }
        }
        const numb = this.col_numb * this.row_numb;

        for (let i = 0; i < this.col_numb; i++) {
            for (let j = 0; j < this.row_numb; j++) {

                const panel = new Panel(
                    temp_points.get(`${i}${j}`),
                    temp_points.get(`${i+1}${j+1}`),
                    this.panels.length.toString(),
                    this);
                this.panels.push(panel);
            }
        }
        for (const panel of this.panels) {
            line(panel.p0.gx, panel.p0.gy, panel.p3.gx, panel.p3.gy);
            text("panel.label", panel.p0.gx, panel.p3.gx);
        }
    }





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
            for (const t of this.columns) {
                ellipse(t.x, t.y, 3, 3);
            }

            // draw base_points along left axis
            for (const t of this.rows) {
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

            this.panels_draw();

        }
        //utility to unpack a p5Vector
    pvline(pv1, pv2) {
        line(pv1.x, pv1.y, pv2.x, pv2.y);
    }




    _make_panel(row, wd) {
        const x = this.rows[row].x;
        const y = this.rows[row].y;
        const w = wd;
        const h = this.rows[row].y + this.row_h;
        const gp = this.make_Gpoint(x, y);
        const p = new Panel(gp, w, h);
        this.made_points.push(gp);
        this.panels.push(p);
        return p
    }

    // make_panels(n) {

    //     for (let i = 0; i < n; i++) {
    //         const gpos = this.make_Gpoint(col[i].x, col[i].y);

    //         const panel = new Panel(gpos, gdim);
    //         this.panels.push(panel);
    //         if (i === 0) {
    //             return
    //         } else {
    //            const prev = new Gpoint(gpos.x, gpos.y);
    //         }

    //          acumulator += w;

    //     }
    //     console.log(this.panels);

    //     return this.panels
    // }

    // make_panels(n) {

    //     const y = this.rows[0].y;
    //     const w = this.grid_w / n;
    //     const h = this.rows.length > 0 ? this.row_h : this.grid_h;

    //     const gdim = this.make_Gpoint(w, h)

    //     let acumulator = this.base_points[0].x;
    //     for (let i = 0; i < n; i++) {
    //         const gpos = this.make_Gpoint(acumulator, y);

    //         const panel = new Panel(gpos, gdim);
    //         this.panels.push(panel);
    //         acumulator += w;

    //     }
    //     console.log(this.panels);

    //     return this.panels
    // }

    panels_draw() {
        for (const p of this.panels) {
            p.doddle_panel();
        }
    }



} //class




//     console.log(`
// dx =  ${dx}
// dy =  ${dy}  
// gx = ${gp.gx}
// gy = ${gp.gy}
// `)