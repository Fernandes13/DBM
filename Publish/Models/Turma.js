function Turma (initials) {
        this.initials = initials;
                 
        Object.defineProperty(this,'id',{ enumerable:false});
}

var database = require('../Database/sqlite.js')('./Publish/Database/labs.db');

Turma.all = function (callback) {
    database.all("SELECT * FROM turmas", Turma, callback);
}

Turma.get = function (id, callback) {
    database.get("SELECT * FROM turmas WHERE turma_id = ?", [id],Turma,callback);
}

Turma.prototype.save = function (callback) {
    console.log(this.id + " ID");
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE turmas SET initials = ? WHERE turma_id = ?",[this.initials,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO turmas (initials) VALUES (?)", [this.initials],callback);
    }
}

Turma.delete = function(id, callback){
    database.run("DELETE FROM turmas WHERE turma_id = ?",[id],callback);  
}

Turma.mappingDBtoObject = {
    initials:'initials',turma_id:'id'
}

module.exports = Turma;