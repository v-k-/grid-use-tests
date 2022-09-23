class Panel {
	//takes 2 Gpoints
    constructor(gp, gdim) {
    	this.pos = gp;
    	this.dim = gdim;
    }

    update_panel(x, y, w, h){
    	this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }


    doddle_panel(){
    	fill(80,100,200,120);
    	rect(this.pos.gx, this.pos.gy, this.dim.gx, this.dim.gy) 
    }

} //class