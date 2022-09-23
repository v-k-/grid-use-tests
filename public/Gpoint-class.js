	// not to be directly instantiade
	// use make_Gpoint from Grid.
	class Gpoint {
	    constructor(x, y, ratio_x, ratio_y, label, grid) {
	        //storing: original points  label is not being used for now
	        this.original_x = x;
	        this.original_y = y;
	        this.gx = x;
	        this.gy = y;
	        this.label = label;
	        this.ratio_x = ratio_x;
	        this.ratio_y = ratio_y;
	        this.grid = grid;
	    }

	    //this is to be caled if the point is intented 
	    //to be animated in draw(). a new ratio is calculated so
	    //if the window is resized the point wil mantain the correct 
	    //relative position
	    update(x, y) {
	        if (x !== null) {
	            const rx = x / grid.left_margin;
	            this.ratio_x = rx;
	            this.gx = this.original_x = x;
	        }
	        if (y !== null) {
	            const ry = y / grid.margin_height;
	            this.ratio_y = ry;
	            this.gy = this.original_y = y;

	        }
	        return createVector(this.gx, this.gy);
	    }

	    //...
	    toString() {
	        return `-Gpoint- 
	         gx= ${this.gx}
	         gy= ${this.gy}
	         ratio_x= ${this.ratio_x}
	         ratio_y= ${this.ratio_y}`;
	    }

	    // not in use also
	    getV() {
	        return createVector(this.gx, this.gy);
	    }


	    // not in use math with Gpoints may be added
	    // or perhaps I'l change only to p5Vectors insede the Grid and Gpoint
	    //...
	    gp_add(pvector) {
	        // console.log(`
	        // 	pvx= ${pvector.x} pvy = ${pvector.y}
	        // 	gx= ${this.gx}  gy= ${this.gy}`);
	        this.gx += pvector.x;
	        this.gy += pvector.y;
	        // console.log(`gx= ${this.gx}  gy= ${this.gy}`);
	    }

	} //class