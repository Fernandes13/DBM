var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./Controllers/api');
var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/api", routes);
app.use("/","./Controllers/frontoffice.js");
app.use("/backoffice","./Controllers/backoffice.js");

var server = app.listen(8082, function () {

    console.log("Example app listening at port 8082");
});