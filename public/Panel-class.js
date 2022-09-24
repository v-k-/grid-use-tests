class Panel {
    //takes 2 Gpoints
    constructor(gp0, gp3, label, grid) {

        this.p0 = gp0;
        this.p3 = gp3;
        this.label = label;
        this.parentGrid = grid;

        this.p1 = this.parentGrid.make_Gpoint(this.p3.gx, this.p0.gy);
        this.p2 = this.parentGrid.make_Gpoint(this.p0.gx, this.p3.gy);
        this.panel_dim = this.parentGrid.make_Gpoint(this.p1.gx - this.p0.gx, this.p2.gy - this.p0.gy);

        // this.panel_grid =  new Grid(3,4,0,0,0,0,this.panel_w, this.panel_h);
        // this.panel_grid.calc_grid();	
        this.center = this.parentGrid.make_Gpoint(this.p0.gx + this.panel_dim.gx / 2, this.p0.gy + this.panel_dim.gy / 2);

    }


    update(){

        this.p1.gx = this.p3.gx;
        this.p1.gy = this.p0.gy;
        this.p2.gx = this.p0.gx;
        this.p2.gy = this.p3.gy;
        this.panel_dim.gx = this.p1.gx - this.p0.gx;
        this.panel_dim.gy = this.p2.gy - this.p0.gy;

        // this.panel_grid =  new Grid(3,4,0,0,0,0,this.panel_w, this.panel_h);
        // this.panel_grid.calc_grid();	
        this.center.gx = this.p0.gx + this.panel_dim.gx / 2;
        this.center.gy = this.p0.gy + this.panel_dim.gy / 2;

    }
    doodle_panel() {
        fill(80, 100, 200, 60);
        rectMode(CORNERS);
        rect(this.p0.gx, this.p0.gy, this.p3.gx, this.p3.gy);
        rectMode(CORNER);
        ellipse(this.p0.gx, this.p0.gy, 30, 30);
        ellipse(this.p1.gx, this.p1.gy, 25, 25);
        ellipse(this.p2.gx, this.p2.gy, 30, 30);
        ellipse(this.p3.gx, this.p3.gy, 25, 25);
        line(this.p0.gx, this.p0.gy, this.p3.gx, this.p3.gy);
        line(this.p2.gx, this.p2.gy, this.p1.gx, this.p1.gy);

        // text(this.label, this.p0.gx, this.p3.gx);
        push();
        noStroke(255);
        fill(40, 50, 100,180);
        textSize(14);
        text(this.label, this.center.gx  - textWidth(this.label)/2, this.center.gy + 20);
        ellipse(this.center.gx, this.center.gy, 10, 10);
        pop();


    }

} //class