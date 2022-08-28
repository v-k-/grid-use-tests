
const express = require('express');
const app = express();
const port = 20853;
//const p5 = require ("sketch");

app.use(express.static('public'));
app.get('/', (req, res) => {
 res.send('<h1>PORRRRRHAM</h1>')



})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

