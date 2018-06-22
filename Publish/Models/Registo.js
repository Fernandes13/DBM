function Registo (Email,Username,Password) {
        this.Email = Email;
                 
        this.Username = Username;
                 
        this.Password = Password;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'utilizador_id',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');

Registo.all = function (callback) {
    database.all("SELECT * FROM registos", Registo, callback);
}

Registo.get = function (id, callback) {
    database.get("SELECT * FROM registos WHERE registo_id = ?", [id],Registo,callback);
}

Registo.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE registos SET Email = ?,Username = ?,Password = ? WHERE registo_id = ?",[this.Email,this.Username,this.Password,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO registos (Email,Username,Password) VALUES (?,?,?)", [this.Email,this.Username,this.Password],callback);
    }
}

Registo.many = function (model,id,callback){
    database.where('SELECT registos.* FROM registos INNER JOIN ${model}_registos ON ${model}_registos.registo_id = registos.registo_id WHERE ${model}_registos.${model.toLowerCase()}_id = ?', [id], Registo, callback)
}


Registo.delete = function(id, callback){
    database.run("DELETE FROM registos WHERE registo_id = ?",[id],callback);  
}

Registo.mappingDBtoObject = {
    Email:'Email',Username:'Username',Password:'Password',registo_id:'id'   
}

module.exports = Registo;