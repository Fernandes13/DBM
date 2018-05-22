var express = require('express');
var bodyParser = require("body-parser");
var frontofficeRoutes = require("./Controllers/frontoffice.js");
var backofficeRoutes = require("./Controllers/backoffice.js");
var routes = require('./Controllers/api');
var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/api", routes);
app.use("/", frontofficeRoutes);
app.use("/backoffice", backofficeRoutes);

var server = app.listen(8082, function () {

    console.log("Example app listening at port 8082");
});