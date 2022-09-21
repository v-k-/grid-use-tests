class Grid {
    constructor(
        coll_numb,
        row_numb,
        gutt_width,
        gutt_height,
        margin_width,
        margin_height
    ) {
        this.coll_numb = coll_numb;
        this.row_numb = row_numb;
        this.gutt_width = gutt_width;
        this.gutt_height = gutt_height;
        this.left_margin = margin_width;
        this.margin_height = margin_height;
        this.center;
        this.base_points = [];
        this.w_slices = [];
        this.h_slices = [];
        this.made_points = []
        this.grid_w;
        this.grid_h;
        this.calc_grid();

    }



    //  // // // // // //
    // P0                 P1
    //
    //       center
    //
    // P2                 P3
    // // // // // // // // 
    calc_grid() {
        let right_margin = width - this.left_margin;
        let bottom_margin = height - this.margin_height;
        const p0 = createVector(this.left_margin, this.margin_height);
        const p1 = createVector(right_margin, this.margin_height);
        const p2 = createVector(this.left_margin, bottom_margin);
        const p3 = createVector(right_margin, bottom_margin);
        const center = createVector(p2.x / 2 + p3.x / 2, p1.y / 2 + p3.y / 2);
        this.base_points = [p0, p1, p2, p3];
        this.center = center;
        this.grid_w = this.base_points[1].x - this.base_points[0].x;
        this.grid_h = this.base_points[2].y - this.base_points[0].y;
        this.make_w_slices(this.coll_numb);
        this.make_h_slices(this.row_numb);

        this.gp_update();

    }

    make_w_slices(n) {
        const coll_width = this.grid_w / n;
        let acc = this.base_points[0].x;
        for (let i = 0; i < n; i++) {
            this.w_slices[i] = createVector(acc, this.base_points[0].y);
            acc += coll_width;
        }
        return coll_width

    }

    make_h_slices(n) {
        const row_width = this.grid_h / n;


        let acc = this.base_points[0].y;

        for (let i = 0; i < n; i++) {
            this.h_slices[i] = createVector(this.base_points[0].x, acc);
            acc += row_width;
        }

    }



    make_Gpoint(x = 0, y = 0) {
        let dx = this.base_points[1].x - this.base_points[0].x;
        let dy = this.base_points[2].y - this.base_points[0].y;

        const rx = (x * 100 / this.grid_w) / 100;
        const ry = (y * 100 / this.grid_h) / 100;

        // console.log(`
        // dx = ${dx}
        // dy = ${dy}
        // rx = ${rx}
        // ry = ${ry}
        // `)
        const gp = new Gpoint(x, y, rx, ry, this);
        this.made_points.push(gp);
        return gp;
    }

    gp_check_ratio() {

        for (let gp of this.made_points) {
            const rx = (gp.gx * 100 / this.grid_w) / 100;
            const ry = (gp.gy * 100 / this.grid_h) / 100;
            if (gp.ratio_x !== rx || gp.ratio_y !== ry) {
                gp.ratio_x = rx;
                gp.ratio_y = ry;
            }
        }
    }
    gp_update() {
        for (const gp of this.made_points) {
            gp.gx = this.grid_w * gp.ratio_x;
            gp.gy = this.grid_h * gp.ratio_y;
            //     console.log(`
            // dx =  ${dx}
            // dy =  ${dy}  
            // gx = ${gp.gx}
            // gy = ${gp.gy}
            // `)
        }
    }


    make_row() {}

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

    //util 
    pvline(pv1, pv2) {
        line(pv1.x, pv1.y, pv2.x, pv2.y);
    }




} //class