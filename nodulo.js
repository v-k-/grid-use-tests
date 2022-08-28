// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 20853;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World from Node.js\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

//const o = require('./este.mjs');
const express = require('express');
const app = express();
const port = 20853;
//const p5 = require ("sketch");

app.use(express.static('public'));
app.get('/', (req, res) => {
 // res.send('<h1>PORRRRRHAM</h1>')
  //res.redirect('test.js');

//console.log('aqui');
//o.desenho();


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

