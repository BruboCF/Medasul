var express = require('express');
var path = require('path');
var app = express();
var port = parseInt(process.env.PORT || "3000", 10);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
