function Professor (firstName,lastName,age,initials) {
        this.firstName = firstName;
                 
        this.lastName = lastName;
                 
        this.age = age;
        Object.defineProperty(this,'age',{ enumerable:false});         
        this.initials = initials;
        Object.defineProperty(this,'initials',{ enumerable:false});         
        Object.defineProperty(this,'id',{ enumerable:false});
}

var database = require('../Database/sqlite.js')('./Publish/Database/labs.db');

Professor.all = function (callback) {
    database.all("SELECT * FROM professors", Professor, callback);
}

Professor.get = function (id, callback) {
    database.get("SELECT * FROM professors WHERE professor_id = ?", [id],Professor,callback);
}

Professor.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE professors SET firstName = ?,lastName = ?,age = ?,initials = ? WHERE professor_id = ?",[this.firstName,this.lastName,this.age,this.initials,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO professors (firstName,lastName,age,initials) VALUES (?,?,?,?)", [this.firstName,this.lastName,this.age,this.initials],callback);
    }
}

Professor.delete = function(id, callback){
    database.run("DELETE FROM professors WHERE professor_id = ?",[id],callback);  
}

Professor.mappingDBtoObject = {
    firstname:'firstName',lastname:'lastName',age:'age',initials:'initials',professor_id:'id'
}

module.exports = Professor;