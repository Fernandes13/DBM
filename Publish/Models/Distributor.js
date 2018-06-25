function Distributor (Name,Value) {
        this.Name = Name;
                 
        this.Value = Value;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'product_id',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');
var relationsName = require('../index.js');
relationsName = relationsName.relationsName;

Distributor.all = function (callback) {
    database.all("SELECT * FROM distributors", Distributor, callback);
}

Distributor.get = function (id, callback) {
    database.get("SELECT * FROM distributors WHERE distributor_id = ?", [id],Distributor,callback);
}

Distributor.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE distributors SET Name = ?,Value = ? WHERE distributor_id = ?",[this.Name,this.Value,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO distributors (Name,Value) VALUES (?,?)", [this.Name,this.Value],callback);
    }
}

Distributor.many = function (model,id,callback){
    var tableName = "distributors + '_' ${model}.toLowerCase() + 's'";
    var tableName2 = "${model}.toLowerCase() + 's_' + distributors";

    if(relationsName.includes(tableName)){
        database.where('SELECT distributors.* FROM distributors INNER JOIN ' +  tableName + ' ON ' + 
        tableName +'.distributor_id = distributors.distributor_id WHERE ' + tableName + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }else{
        database.where('SELECT distributors.* FROM distributors INNER JOIN ' +  tableName2 + ' ON ' + 
        tableName2 +'.distributor_id = distributors.distributor_id WHERE ' + tableName2 + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }

}


Distributor.delete = function(id, callback){
    database.run("DELETE FROM distributors WHERE distributor_id = ?",[id],callback);  
}

Distributor.top = function (property,order,limit,callback) {
    var dbprop = Object.keys(Distributor.mappingDBtoObject).find(key => Distributor.mappingDBtoObject[key] == property);
    var tableName = "Distributor".toLowerCase() + "s";
    database.where(`SELECT * FROM ${tableName} ORDER BY ${dbprop} ${order} LIMIT ?`, [limit], Distributor, callback);
}

Distributor.mappingDBtoObject = {
    Name:'Name',Value:'Value',distributor_id:'id'   
}

module.exports = Distributor;