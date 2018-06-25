var mustache = require("mustache");
var fs = require("fs");

function createClass(dbname,schemas) {
  schemas.forEach(schema => {
    var view = {
      dbname: dbname,
      title: schema.title,
      table: schema.title.charAt(0).toLowerCase() + schema.title.slice(1) + "s",
      primaryKey: {
        name: "id",
        columnName:
          schema.title.charAt(0).toLowerCase() + schema.title.slice(1) + "_id"
      },
      properties: function() {
        //função para converter as propriedades que são objectos para um array de objetos (mais fácil para processar)
        return Object.keys(schema.properties).map(key => {
          //converte as propriedades que são objectos para um array de objetos (mais fácil para processar)
          schema.properties[key].name = key; //acrescento a propriedade name que terá o nome da propriedade
          schema.properties[key].required = schema.required.indexOf(key) !== -1; //acrescento a propriedade required que terá true ou false caso esteja no array required do schema
          schema.properties[key].columnName = key; //será o nome utilizado para a coluna que terá na tabela da base de dados
          return schema.properties[key];
        });
      },
      references : function (){
        return Object.keys(schema.references).map(elem =>{

          schema.references[elem].name = schema.references[elem].model.charAt(0).toLowerCase() + schema.references[elem].model.slice(1) + "_id";
          return schema.references[elem];
        });
      },
      mappingReferences : function (){
        return Object.keys(schema.references).filter(elem =>{
          if(schema.references[elem].isParent !== true){
              //schema.references[elem].name = schema.references[elem].model.charAt(0).toLowerCase() + schema.references[elem].model.slice(1) + "_id";
              return {
                name: ", " + schema.references[elem].model.charAt(0).toLowerCase() + schema.references[elem].model.slice(1) + "_id :",
                value: "' " + schema.references[elem].model.charAt(0).toLowerCase() + schema.references[elem].model.slice(1) + "_id '"
              }
          }
        });
      },
      get propertiesJoin() {
        //criar um array com os nomes das propriedades e fazer o join para separar por ,
        return this.properties()
          .map(obj => {
            return obj.name;
          })
          .join();
      },
      get propertiesJoinThis() {
        //criar um array com os nomes das propriedades (com o this.) e fazer o join para separar por ,
        return this.properties()
          .map(obj => {
            return "this." + obj.name;
          })
          .join();
      },
      get propertiesSetValues() {
        //criar um array com os nomes das propriedades (igualando a um parâmetro) e fazer o join para separar por ,
        return this.properties()
          .map(obj => {
            return obj.name + " = ?";
          })
          .join();
      },
      get propertiesValuesParams() {
        //criar um array com os parâmetros igual ao número de propriedades e fazer o join para separar por ,
        return this.properties()
          .map(obj => {
            return "?";
          })
          .join();
      },
      get mappingDBtoObject() {
        //criar um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
        var props = this.properties();
        props.push(this.primaryKey);
        return props
          .map(obj => {
            return obj.columnName + ":'" + obj.name + "'";
          })
          .join();
      }
    };


    var template = fs.readFileSync("./Model/Class/class.mustache").toString();
    var output = mustache.render(template, view);
    var name = "./Publish/Models/" + view.title + ".js";

    fs.writeFile(name, output);
  });
}

module.exports.createClass = createClass;
