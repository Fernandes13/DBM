const dbpath = 'lab.db';
//var sqlite = require('../sqlite.js')(dbpath);
var mustache = require("mustache");
var fs = require('fs');

function createClass(schema){
  var view = {
    classTitle: schema.title,
    classProperties: Object.keys(schema.properties).join(),
    classConstructor: function() {
      var result = "";
      Object.keys(schema.properties).forEach(function(element){
          if(schema.required.includes(element)){
              result+= "this." + element + "=" + element + ";\n";
          }else{
              result+= "Object.defineProperty(this, '" + element + "',{enumerable: false});\n";
          }
          
      });
  
      return result;
    },
    get propertiesJoin() { //criar um array com os nomes das propriedades e fazer o join para separar por ,
        return this.properties().map(obj => {
            return obj.name
        }).join()
    },
    get propertiesJoinThis() { //criar um array com os nomes das propriedades (com o this.) e fazer o join para separar por ,
        return this.properties().map(obj => {
            return 'this.' + obj.name
        }).join()
    },
    get propertiesSetValues() { //criar um array com os nomes das propriedades (igualando a um parâmetro) e fazer o join para separar por ,
        return this.properties().map(obj => {
            return obj.name + ' = ?'
        }).join()
    },
    get propertiesValuesParams() { //criar um array com os parâmetros igual ao número de propriedades e fazer o join para separar por ,
        return this.properties().map(obj => {
            return '?'
        }).join()
    },
    get mappingDBtoObject() { //criar um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
        var props = this.properties();
        props.push(this.primaryKey);
        return props.map(obj => {
            return obj.columnName.toLowerCase() + ":'" + obj.name + "'";
        }).join()
    }
    
  };
  
  var template = fs.readFileSync('./Model/Class/class.mustache').toString();
  var output = mustache.render(template, view);
  var name = './Publish/Models/' + view.classTitle + '.js';


  fs.writeFile(name, output);
}  
//console.log(schema);
//console.log(view);

module.exports.createClass = createClass;
