class Panel {
	//takes 2 Gpoints
    constructor(gp0, gp3, label, grid) {

    	this.p0 = gp0;
    	this.p3 = gp3;
    	this.label = label;
    	this.parentGrid = grid;

    	this.p1 = this.parentGrid.make_Gpoint(this.p3.x, this.p0.y);
    	this.p2 = this.parentGrid.make_Gpoint(this.p0.x, this.p3.y);
    	this.panel_w = this.p1.x - this.p0.x;
    	this.panel_h = this.p2.y - this.p0.y;
    	this.center = this.parentGrid.make_Gpoint(this.panel_w/2, this.panel_h/2); 
    }



    doddle_panel(){
    	fill(80,100,200,120);
    	rectMode(CORNERS);
    	rect(this.p0.gx, this.p0.gy, this.p3.gx, this.p3.gy);
    	rectMode(CORNER); 


    	textSize(20);
    	text(this.label, this.center.gx, this.center.gy);
    	ellipse(this.center.gx, this.center.gy, 10, 10);


    }

} //class