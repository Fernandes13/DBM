var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var mustache = require('mustache');
var childProcess = require('child_process');
var class_generator = require("../Model/Class/generate-class.js");
var database_generator = require("../Model/Database/generate-database.js");
var api_generator = require("../Model/Controllers/generate-controllers.js");
var configs = JSON.parse(fs.readFileSync('./Server/config.json'));



function createIndex(){
    var template = fs.readFileSync('./Server/server.mustache').toString();
    
    var output = mustache.render(template, configs);

    fs.writeFile('./Publish/index.js', output);

    childProcess.fork('./Publish/index.js', [], {execArgv: ['--debug=8082']});
}

function copyStaticFiles(){
    configs.staticFiles.forEach(file =>{
        fs.createReadStream(file.originalPath).pipe(fs.createWriteStream(file.destinationPath));
    });
}

function createDatabase(){
    var schemas = [];

    configs.models.forEach(model =>{
        schemas.push(JSON.parse(fs.readFileSync(model.path)));
    });

    database_generator.generate(configs.dbname,schemas);
    setTimeout(() =>{database_generator.addForeignKey(configs.dbname,schemas)},1000);
    setTimeout(() =>{copyStaticFiles()},1000);
}

function createClass(){
    var schemas = [];

    configs.models.forEach(model =>{
        schemas.push(JSON.parse(fs.readFileSync(model.path)));
    });

    class_generator.createClass(configs.dbname,schemas);
}

function generateApi(){
    api_generator.generateApi(configs);
}

function generateFrontOffice(){
    console.log("entrou front");
    var template = fs.readFileSync("./Server/frontOffice.mustache").toString();
    var output = mustache.render(template);
    var name = "./Publish/Controllers/frontOffice.js";

    fs.writeFile(name, output);
}
  
function generateBackOffice(){
    var view = {
        models: function() {
          return configs.models.map(model => {
            return {
              title: model.name,
            };
          });
        }
    };

    var template = fs.readFileSync("./Server/backOffice.mustache").toString();
    var output = mustache.render(template,view);
    var name = "./Publish/Controllers/backOffice.js";

    fs.writeFile(name, output);
}

function createFolders(){
    mkdirp('./Publish/Controllers');
    mkdirp('./Publish/Models');
    mkdirp('./Publish/Views');
    mkdirp('./Publish/Database');

    mkdirp('./Publish/Public', function (err) {
        
        if (err) console.log("Erro pasta public");

        mkdirp('./Publish/Public/Css');

        mkdirp('./Publish/Public/Images');

        mkdirp('./Publish/Public/Js');
    });
}

function clearFolders() {
    del(['./Publish/']).then(paths => createFolders());
}

module.exports.clearFolders = clearFolders;
module.exports.createFolders = createFolders;
module.exports.createClass = createClass;
module.exports.createDatabase = createDatabase;
module.exports.createIndex = createIndex;
module.exports.generateApi = generateApi;
module.exports.generateFrontOffice = generateFrontOffice;
module.exports.generateBackOffice = generateBackOffice;