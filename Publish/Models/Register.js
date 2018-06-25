function Register (Email,Username,Password) {
        this.Email = Email;
                 
        this.Username = Username;
                 
        this.Password = Password;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'user_id',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');
var relationsName = require('../index.js');
relationsName = relationsName.relationsName;

Register.all = function (callback) {
    database.all("SELECT * FROM registers", Register, callback);
}

Register.get = function (id, callback) {
    database.get("SELECT * FROM registers WHERE register_id = ?", [id],Register,callback);
}

Register.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE registers SET Email = ?,Username = ?,Password = ? WHERE register_id = ?",[this.Email,this.Username,this.Password,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO registers (Email,Username,Password) VALUES (?,?,?)", [this.Email,this.Username,this.Password],callback);
    }
}

Register.many = function (model,id,callback){
    var tableName = "registers + '_' ${model}.toLowerCase() + 's'";
    var tableName2 = "${model}.toLowerCase() + 's_' + registers";

    if(relationsName.includes(tableName)){
        database.where('SELECT registers.* FROM registers INNER JOIN ' +  tableName + ' ON ' + 
        tableName +'.register_id = registers.register_id WHERE ' + tableName + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }else{
        database.where('SELECT registers.* FROM registers INNER JOIN ' +  tableName2 + ' ON ' + 
        tableName2 +'.register_id = registers.register_id WHERE ' + tableName2 + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }

}


Register.delete = function(id, callback){
    database.run("DELETE FROM registers WHERE register_id = ?",[id],callback);  
}

Register.top = function (property,order,limit,callback) {
    var dbprop = Object.keys(Register.mappingDBtoObject).find(key => Register.mappingDBtoObject[key] == property);
    var tableName = "Register".toLowerCase() + "s";
    database.where(`SELECT * FROM ${tableName} ORDER BY ${dbprop} ${order} LIMIT ?`, [limit], Register, callback);
}

Register.mappingDBtoObject = {
    Email:'Email',Username:'Username',Password:'Password',register_id:'id'   
}

module.exports = Register;