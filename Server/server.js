var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var mustache = require('mustache');
var childProcess = require('child_process');
var class_generator = require("../Model/Class/generate-class.js");
var database_generator = require("../Model/Database/generate-database.js");
var configs = JSON.parse(fs.readFileSync('./Server/config.json'));



function createIndex(){
    var template = fs.readFileSync('./Server/server.mustache').toString();
    
    var output = mustache.render(template, configs);

    fs.writeFile('./Publish/index.js', output);

    childProcess.fork('./Publish/index.js', [], {execArgv: ['--debug=8080']});
}

function createDatabase(){
    var schemas = [];

    configs.models.forEach(model =>{
        schemas.push(JSON.parse(fs.readFileSync(model.path)));
    });

   //database_generator.generate(configs.dbname,schemas);
   database_generator.addForeignKey(configs.dbname,schemas);
   
}

function createClass(schema){
    class_generator.createClass(schema);
}

function createFolders(callback){
    mkdirp('./Publish/Controllers');
    mkdirp('./Publish/Models');
    mkdirp('./Publish/Views');
    mkdirp('./Publish/Database');

    mkdirp('./Publish/Public', function (err) {
        callback();
        if (err) console.log("Erro pasta public");

        mkdirp('./Publish/Public/Css');

        mkdirp('./Publish/Public/Images');

        mkdirp('./Publish/Public/Js');
    });
}

function clearFolders() {
    del(['./Publish/']).then(paths => createFolders(createIndex));
}

module.exports.clearFolders = clearFolders;
module.exports.createFolders = createFolders;
module.exports.createClass = createClass;
module.exports.createDatabase = createDatabase;