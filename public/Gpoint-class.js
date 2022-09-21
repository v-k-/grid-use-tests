	// not to be directly instantiade
	// use make_Gpoint from Grid.
	class Gpoint {
	    constructor(x, y, ratio_x, ratio_y, label, grid) {
	        this.original_x = x;
	        this.original_y = y;
	        this.gx = x;
	        this.gy = y;
	        this.label = label;
	        this.ratio_x = ratio_x;
	        this.ratio_y = ratio_y;
	        this.grid = grid;
	    }


	    getV() {
	        return createVector(this.gx, this.gy);
	    }

	    toString() {
	        return `Gpoint ->  gx= ${this.gx} gy= ${this.gy}`;
	    }

	    gp_add(pvector) {
	        // console.log(`
	        // 	pvx= ${pvector.x} pvy = ${pvector.y}
	        // 	gx= ${this.gx}  gy= ${this.gy}`);
	        this.gx += pvector.x;
	        this.gy += pvector.y;
	        // console.log(`gx= ${this.gx}  gy= ${this.gy}`);
	    }

	    update(x, y, grid) {
	        const rx = (x * 100 / grid.grid_w) / 100;
	        const ry = (y * 100 / grid.grid_h) / 100;
	        this.ratio_x = rx;
	        this.ratio_y = ry;
	        this.gx = this.original_x = x;
	        this.gy = this.original_y = y;
	        return createVector(x,y);

	    }
	} //class