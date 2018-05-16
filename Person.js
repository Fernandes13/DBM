var mustache = require("mustache");
var fs = require('fs');

function Person(firstName, lastName, age) {
    this.firstName = firstName;

    this.lastName = lastName;

    this.age = age;
    Object.defineProperty(this, 'age', {
        enumerable: false
    });
    Object.defineProperty(this, 'id', {
        enumerable: false
    });
}

var database = require('./sqlite.js')('lab.db');

Person.all = function (callback) {
    //fazer a chamada à função all do database
}

Person.get = function (id, callback) {
    //fazer a chamada à função get do database
}

Person.prototype.save = function (callback) {
    
    if (this.id) { //Se existir valor no id será para update
        
        var view = {
            tableName: 'Person',
            values: function () {
                let result = [];
                Object.keys(this).forEach(prop => {
                    result.push(prop);
                });
                return result;
            },
            conditions: tableName.charAt(0).toLowerCase() + tableName.slice(1) + "s_id" + " = " + this.id + ";"
        }

        var template = fs.readFileSync("./Model/Database/update.mustache").toString();
        var output = mustache.render(template, view);
        console.log(output);
        //db.run(output);
    } else { //caso contrário para insert
        let obj =  this;
        let props = function () {
            let result = [];
            Object.keys(obj).forEach(prop =>{
                result.push(prop);
            });
            return result;
        };

        let values = function () {
            let result = [];
            Object.keys(obj).forEach(prop => {
                result.push(obj[prop]);
            });
            return result;
        }

        var view2 = {
            tableName: 'Person',
            columns: props,
            values: values
        }

        var template = fs.readFileSync("./Model/Database/insert.mustache").toString();
        var output = mustache.render(template, view2);
        console.log(output);
       // db.run(output);
    }
}

Person.mappingDBtoObject = {
    firstname: 'firstName',
    lastname: 'lastName',
    age: 'age',
    person_id: 'id'
}

function test() {
    var p = new Person('ola', 'mundo', 20);
    p.save(log);

    function log(value) {
        console.log(value);
    }
}

test();

//module.exports = Person;