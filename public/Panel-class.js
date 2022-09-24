class Panel {
    //takes 2 Gpoints
    constructor(gp0, gp3, label, grid) {

        this.p0 = gp0;
        this.p3 = gp3;
        this.label = label;
        this.parentGrid = grid;


        this.panel_w = this.p3.gx - this.p0.gx;
        this.panel_h = this.p3.gy - this.p0.gy;
        this.panel_grid  = new  Grid(1,1,0,0,0,0, );
		
		this.p1 = this.panel_grid.make_Gpoint(this.p3.gx, this.p0.gy);
        this.p2 = this.panel_grid.make_Gpoint(this.p0.gx, this.p3.gy);
        this.center = this.panel_grid.make_Gpoint(this.panel.x this.panel_w / 2, this.panel_h / 2);
        
                        console.log(this.panel_w); console.log(this.panel_h);


    }



    doddle_panel() {
        fill(80, 100, 200, 120);
        rectMode(CORNERS);
        rect(this.p0.gx, this.p0.gy, this.p3.gx, this.p3.gy);
        rectMode(CORNER);
        ellipse(this.p0.gx, this.p0.gy, 30, 30);
        ellipse(this.p1.gx, this.p1.gy, 25, 25);
        ellipse(this.p2.gx, this.p2.gy, 30, 30);
        ellipse(this.p3.gx, this.p3.gy, 25, 25);
        line(this.p0.gx, this.p0.gy, this.p3.gx, this.p3.gy);	

        // text(this.label, this.p0.gx, this.p3.gx);

        textSize(20);
        //text(this.label, this.center.gx, this.center.gy);
        ellipse(this.center.gx, this.center.gy, 10, 10);



    }

} //class