var sqlite3 = require("sqlite3").verbose();
var mustache = require("mustache");
var fs = require("fs");
var relationsName = [];

function generate(nome, schemas) {
  var db = new sqlite3.Database("./Publish/Database/" + nome);

  schemas.forEach(schema => {
    var nameTable = schema.title.charAt(0).toLowerCase() + schema.title.slice(1);

    var view = {
      tableName: nameTable,
      queryBody: function () {
        var result = nameTable + "_id INTEGER PRIMARY KEY AUTOINCREMENT,\n";

        Object.keys(schema.properties).forEach(function (element) {
          var coluna = schema.properties[element];
          result += element + " " + coluna.type;

          if (schema.required.includes(element)) {
            result += " NOT NULL";
          }

          if (coluna.unique) {
            result += " UNIQUE";
          }

          if (coluna.maximum != void 0 && coluna.minimum != void 0) {
            result += "\nCheck(" + element + " >= " + coluna.minimum + " and " + element + " <= " + coluna.maximum + ")";
          } else if (coluna.minimum != void 0) {
            result += "\nCheck(" + element + " >= " + coluna.minimum + ")";
          } else if (coluna.maximum != void 0) {
            result += "\nCheck(" + element + " <= " + coluna.maximum + ")";
          }

          result += ",\n";
        });

        return result.slice(0, result.length - 2);
      }
    };

    var template = fs.readFileSync("./Model/Database/create-table.mustache").toString();
    var output = mustache.render(template, view);
    //console.log(output);
    db.run(output);
  });

  db.close();
}

function addForeignKey(nome, schemas) {
  var db = new sqlite3.Database("./Publish/Database/" + nome);
  schemas.forEach(schema => {
    var nameTable = schema.title.charAt(0).toLowerCase() + schema.title.slice(1);
    
    if (schema.references != void(0)) {
      schema.references.forEach(foreignkey => {
        var nameFk = foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1);
        if (foreignkey.relation != "M-M" && foreignkey.relation.slice(1) == '-M') {
          var view = {
            tableName: nameTable,
            columnName: nameFk,
            constraints: function () {
              if (foreignkey.relation.charAt(0) != "0") {
                return "NOT NULL";
              }

              return "";
            },
            parentInfo: nameFk + "s(" + nameFk
          };

          var template = fs.readFileSync("./Model/Database/add-foreign-key.mustache").toString();
          var output = mustache.render(template, view);
          //console.log(output);
          db.run(output);

        } else if (foreignkey.relation == "M-M") {
          let name1 = nameTable + "s_" + nameFk;
          let name2 = nameFk + "s_" + nameTable;

          if (!relationsName.includes(name1) && !relationsName.includes(name2)) {
            relationsName.push(name1);
            var view = {
              tableName: name1,
              queryBody: function () {
                let result = "";
                result = nameTable + "_id INTEGER NOT NULL REFERENCES " + nameTable + "s(" + nameTable + "_id),\n" +
                nameFk + "_id INTEGER NOT NULL REFERENCES " + nameFk + "s(" + nameFk + "_id),\nPRIMARY KEY(" + 
                nameTable + "_id," + nameFk + "_id)\n";
                //console.log(result);
                return result; //falta acrescentar que aqueles id's são fk's.
              }
            }

            var template = fs.readFileSync("./Model/Database/create-table.mustache").toString();
            var output = mustache.render(template, view);
            //console.log(output);
            db.run(output);
          }
        }else{
          var view = {
            tableName: nameTable,
            columnName: nameFk,
            parentInfo: nameFk + "s(" + nameFk,
            indexName: nameFk
          }

          var template = fs.readFileSync("./Model/Database/unique-foreign-key.mustache").toString();
          var output = mustache.render(template, view);
          //console.log(output);
          db.run(output);
        }
      });
    }
  });
  db.close();
}

module.exports.generate = generate;
module.exports.addForeignKey = addForeignKey;