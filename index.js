var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
var path = require('path');
var serverModule = require("./Server/server");
var mustache = require('mustache');

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

    setTimeout(() => { fs.createReadStream(req.body.theme).pipe(fs.createWriteStream("./Publish/Public/css/site.css")) }, 1000);
    res.sendStatus(200);
});

app.post("/saveModule", function (req, res) {
    var body = req.body;
    var path = "./Model/Schemas/" + body.title + "Schema.js";
    /*fs.writeFile(path, objectJSON, function (err) {
        if (err) {
            throw 'could not open file: ' + err;
        }
        console.log("The file was saved!");
    });*/
    var view = {
        title: body.title,
        description: body.description,
        type: body.type,
        properties: JSON.stringify(body.properties),
        required: body.required,
        references: JSON.stringify(body.references)
    }
    var template = fs.readFileSync("./Server/schema.mustache").toString();
    var output = mustache.render(template, view);
    fs.writeFile(path, output);

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

app.get("/models", function (req, res) {
    var pathConfig = fs.readFileSync("./Server/config.json");
    pathConfig = JSON.parse(pathConfig);
    var schemas = [];
    pathConfig.models.forEach(model => {
        schemas.push(model.name);
    });
    res.send(schemas);
});

app.delete("/delete/:name", function (req, res) {
    var fileName = req.params.name + "Schema.js";
    var pathConfig = fs.readFileSync("./Server/config.json");
    pathConfig = JSON.parse(pathConfig);
    var modelDelete = {
        name: req.params.name,
        path: "./Model/Schemas/" + fileName
    };
    pathConfig.models.forEach(model => {
        if (model.name === modelDelete.name) {
            pathConfig.models.splice(pathConfig.models.indexOf(model), 1);
        }
    });
    fs.writeFileSync("./Server/config.json", JSON.stringify(pathConfig));
    fs.unlink("./Model/Schemas/" + fileName, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Success");
            res.sendStatus(200);
        }
    });
});

app.put('/edit/:name', function (req, res) {
    var pathConfig = fs.readFileSync("./Server/config.json");
    pathConfig = JSON.parse(pathConfig);

    var modelFound = pathConfig.models.find(function (model) {
        if (model.name === req.params.name) {
            return model;
        }
    });

});

app.get("/get/:name", function (req, res) {
    var fileName = "./Model/Schemas/" + req.params.name + "Schema.js";
    var schema = fs.readFileSync(fileName);
    console.log("Schema: " + schema);
    res.send(schema);
});

app.get("/modelOptions", function (req, res) {
    var pathConfig = fs.readFileSync("./Server/config.json");
    pathConfig = JSON.parse(pathConfig);
    var schemas = [];
    pathConfig.models.forEach(model => {
        schemas.push(model.name);
    });
    res.send(schemas);
});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});