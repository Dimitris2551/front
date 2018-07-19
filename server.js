'use strict';

const express = require('express');
const path = require('path');
const port = 3000;

let app = express();
app.use(express.static('public'));

app.get('/', (req, res)=>{

});

app.listen(port);