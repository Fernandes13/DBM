var express = require('express');
var bodyParser = require("body-parser");
var mustacheExpress = require('mustache-express');
var frontofficeRoutes = require("./Controllers/frontOffice.js");
var backofficeRoutes = require("./Controllers/backOffice.js");
var routes = require('./Controllers/api');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/Views');

app.use("/api", routes);
app.use("/", frontofficeRoutes);
app.use("/backoffice", backofficeRoutes);

var server = app.listen(8082, function () {
    console.log("Example app listening at port 8082");
});



