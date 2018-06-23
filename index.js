var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
var path = require('path');
var serverModule = require("./Server/server");

app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/", "index.html"));
});

app.post("/newSchema", function (req, res) {
    res.sendStatus(200);
});

app.post("/generate", function (req, res) {

    serverModule.clearFolders();
    setTimeout(() => { serverModule.createClass() }, 1000);
    setTimeout(() => { serverModule.createDatabase() }, 2000);
    setTimeout(() => { serverModule.generateApi() }, 3000);
    setTimeout(() => { serverModule.generateFrontOffice() }, 4000);
    setTimeout(() => { serverModule.generateBackOffice() }, 5000);
    setTimeout(() => { serverModule.createIndex() }, 6000);

    res.sendStatus(200);
});

app.post("/saveModule", function (req, res) {
    var body = req.body;
    var objectJSON = JSON.stringify(body);
    var path = "./Model/Schemas/" + body.title + ".json";
    fs.writeFile(path, objectJSON, function (err) {
        if (err) {
            throw 'could not open file: ' + err;
        }
        console.log("The file was saved!");
    });
    var pathConfig = "./Server/config.json";
    fs.readFile(pathConfig, function (err, data) {
        if (err) {
            throw 'could not read file: ' + err;
        }
        var configObj = JSON.parse(data);
        configObj.models.push({ "name": body.title, "path": path });
        fs.writeFile(pathConfig, JSON.stringify(configObj), function (err) {
            if (err) {
                throw 'could not open file: ' + err;
            }
            res.sendStatus(201);
        })
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});