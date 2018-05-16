var Ajv = require('ajv');
var fs = require('fs');
var ajv = new Ajv({allErrors: true});


//var schema = JSON.parse(fs.readFileSync("alunosSchema.json"));
var schema = JSON.parse(fs.readFileSync("./Publish/Validate/turmaSchema.json"));
var data = JSON.parse(fs.readFileSync("./Publish/Validate/alunos.json"));

var validate = ajv.compile(schema);

function test(data) {
    var valid = validate(data);
    if (valid) console.log('Valid!');
    else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}

test(data[0]);
test(data[5]);
    