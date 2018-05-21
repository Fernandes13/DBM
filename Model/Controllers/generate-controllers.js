var mustache = require("mustache");
var fs = require("fs");

function generateApi(configs) {
  var view = {
    models: function() {
      return configs.models.map(model => {
        return {
          title: model.name,
        };
      });
    }
  };

  var template = fs.readFileSync("./Model/Controllers/api.mustache").toString();
  var output = mustache.render(template, view);
  var name = "./Publish/Controllers/api.js";

  fs.writeFile(name, output);
}

module.exports.generateApi = generateApi;
