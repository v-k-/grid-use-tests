const fs = require ('fs');
const raw = fs.readFileSync('words.json');
let words = JSON.parse(raw);
console.log(words);

const express = require('express');
const app = express();
const port = 20853;
//const p5 = require ("sketch");

app.use(express.static('public'));



app.get('/escreve/:coisas/:num', (req, res) => {

    var data = req.params;
    var number = data.num;
    var cs = data.coisas;
    var reply = "";
    for (var i = 0; i < number; i++) {
        reply += "Essas " + cs + " " + number + "vezes. </br>";
    }

    res.send(reply);


})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})