'use strict';

const express = require('express');
const port = 3000;

let app = express();
app.use(express.static('public/static'));

app.listen(port, ()=>console.log(`server started at port ${port}...`));