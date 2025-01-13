var express = require('express');
var path = require('path');
/*import * as express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';*/
var app = express();
var port = parseInt(process.env.PORT || "3000", 10);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
