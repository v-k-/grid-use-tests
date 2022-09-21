const fs = require('fs');
const raw = fs.readFileSync('words.json');
let words = JSON.parse(raw);
console.log(words);

const express = require('express');
const app = express();
const port = 20853;
//const p5 = require ("sketch");



app.use(express.static('public'));



app.get('/add/:word/:score?', addWord)

function addWord(req, res) {

    var data = req.params;
    var word = data.word;
    var score = Number(data.score);
    var reply = "";

    if (!score) {
        reply = {
            "word": word,
            "score": score,
            "msg": "score is required."
        }
        res.send(reply);

    } else {
        words[word] = score;
        fs.writeFile('words.json', JSON.stringify(words, null, 2), finished)

        function finished(err) {
            console.log('writen!');
        }
        reply = {

            "word": word,
            "score": score,
            "msg": "Thanks! " + word + " added."
        }
        res.send(reply);
    }


};



app.get('/all', sendAll);

function sendAll(req, res) {
    res.send(words);
};

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})