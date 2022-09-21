//init express and create an app that listens at port 20853
const express = require('Express');
const app = express();
const port = 20853;


// utility modules
// File System

const fs = require('fs');


// serve static files via Express
// there will build the client side
app.use(express.static('public'));


// start app
app.listen(port, () => console.log('server listening on port '+ port))