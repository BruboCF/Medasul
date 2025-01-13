"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var app = express();
var port = parseInt(process.env.PORT || "3000", 10);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
