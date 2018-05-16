var express = require("express");
var app = express();
var fs = require("fs");
var serverModule = require("./Server/server");
var schema = JSON.parse(fs.readFileSync("./Model/Schemas/alunosSchema.json"));

app.use(express.static('public'));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

app.post("/generate", function (req, res) {
    //serverModule.clearFolders();
    
    //serverModule.createClass(schema);
    serverModule.createDatabase(schema.title, schema);
    
    res.sendStatus(200);
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});