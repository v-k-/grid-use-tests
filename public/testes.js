let tela = new p5((p) => {


    let dummy;
    p.setup = () => {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.position(0, 0);
            canvas.style('z-index', '-1');
            dummy = p.createDiv('');



            twttr.widgets.createTweet('511181794914627584', dummy.elt, )
                .then((el) => {
                    dummy.show()
                });








        } //\\ setup


    p.draw = () => {



            //p.background(125);
            // p.fill(235, 34, 67, 10);
            // p.translate(p.mouseX, p.mouseY);
            // p.rect(0, 0, 20, 20)

            if(p.mouseIsPressed){dummy.position(p.mouseX, p.mouseY);}





        } //\\draw


    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    }




}, 'display');