var ob = {

  este: function(){

    console.log('ob a oba');

},

 desenho: function(){
  let instance_1 = new p5((p) => {


  p.setup = () =>{
   p.createCanvas(200, 100);
   p.background(235,178,222);


}

}, 'domId2');
 }
};



module.exports = ob;