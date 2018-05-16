var sqlite3 = require("sqlite3").verbose();
var mustache = require("mustache");
var fs = require("fs");
var relationsName = [];

function generate(nome, schemas) {
  var db = new sqlite3.Database("./Publish/Database/" + nome);

  schemas.forEach(schema => {
    var view = {
      tableName: schema.title.charAt(0).toLowerCase() + schema.title.slice(1),
      queryBody: function () {
        var result =
          schema.title.charAt(0).toLowerCase() +
          schema.title.slice(1) +
          "_id INTEGER PRIMARY KEY AUTOINCREMENT,\n";

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
            result +=
              "\nCheck(" +
              element +
              " >= " +
              coluna.minimum +
              " and " +
              element +
              " <= " +
              coluna.maximum +
              ")";
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
    console.log(output);
    db.run(output);
  });

  db.close();
}

function addForeignKey(nome, schemas) {
  var db = new sqlite3.Database("./Publish/Database/" + nome)
  schemas.forEach(schema => {
    if (schema.references != void(0)) {
      schema.references.forEach(foreignkey => {
        console.log(foreignkey.relation)
        if (foreignkey.relation != "M-M" && foreignkey.relation.slice(1,foreignkey.relation.length) == '-M') {
          var view = {
            tableName: schema.title.charAt(0).toLowerCase() + schema.title.slice(1),
            columnName: foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1),
            constraints: function () {
              if (foreignkey.relation.charAt(0) != "0") {
                return "NOT NULL";
              }

              return "";
            },
            parentInfo: foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1) + "s(" + foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1)
          };

          var template = fs.readFileSync("./Model/Database/add-foreign-key.mustache").toString();
          var output = mustache.render(template, view);
          console.log(output);
          db.run(output);

        } else if (foreignkey.relation == "M-M") {
          let name1 = schema.title.charAt(0).toLowerCase() + schema.title.slice(1) + "s_" + foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1);
          let name2 = foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1) + "s_" + schema.title.charAt(0).toLowerCase() + schema.title.slice(1);

          if (!relationsName.includes(name1) && !relationsName.includes(name2)) {
            relationsName.push(name1);
            var view = {
              tableName: name1,
              queryBody: function () {
                let result = "";
                result = schema.title.charAt(0).toLowerCase() + schema.title.slice(1) + "_id INTEGER NOT NULL REFERENCES " +
                  schema.title.charAt(0).toLowerCase() + schema.title.slice(1) + "s(" + schema.title.charAt(0).toLowerCase()
                   + schema.title.slice(1) + "_id),\n" +
                  foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1) + "_id INTEGER NOT NULL REFERENCES " +
                  foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1) + "s(" +
                  foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1) + "_id),\nPRIMARY KEY(" 
                + schema.title.charAt(0).toLowerCase() + schema.title.slice(1) + "_id," +
                  foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1) + "_id)\n";
                console.log(result);
                return result; //falta acrescentar que aqueles id's são fk's.
              }
            }

            var template = fs.readFileSync("./Model/Database/create-table.mustache").toString();
            var output = mustache.render(template, view);
            console.log(output);
            db.run(output);
          }
        }else{
          var view = {
            tableName: schema.title.charAt(0).toLowerCase() + schema.title.slice(1),
            columnName: foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1),
            parentInfo: foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1) + "s(" + foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1),
            indexName: foreignkey.model.charAt(0).toLowerCase() + foreignkey.model.slice(1)
          }

          var template = fs.readFileSync("./Model/Database/unique-foreign-key.mustache").toString();
          var output = mustache.render(template, view);
          console.log(output);
          db.run(output);
        }
      });
    }
  });
  db.close();
}

function fkRelationMtoM(){

}



module.exports.generate = generate;
module.exports.addForeignKey = addForeignKey;