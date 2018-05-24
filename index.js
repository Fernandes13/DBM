var express = require("express");
var app = express();
var fs = require("fs");
var serverModule = require("./Server/server");
var schema = JSON.parse(fs.readFileSync("./Model/Schemas/alunosSchema.json"));

app.use(express.static('public'));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

app.post("/newSchema", function (req, res) {
    res.sendStatus(200);
    console.log("CCCCCCCCCCCCCCCCCCCCC");
    console.log(req.body);
});

app.post("/generate", function (req, res) {

    serverModule.clearFolders();
    setTimeout(() => { serverModule.createClass(schema) }, 1000);
    setTimeout(() => { serverModule.createDatabase() }, 2000);
    setTimeout(() => { serverModule.generateApi() }, 3000);
    setTimeout(() => { serverModule.generateFrontOffice() }, 4000);
    setTimeout(() => { serverModule.generateBackOffice() }, 5000);
    setTimeout(() => { serverModule.createIndex() }, 6000);

    res.sendStatus(200);
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});