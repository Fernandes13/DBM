function Bill (Value) {
        this.Value = Value;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'sale_id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'user_id',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');
var relationsName = require('../index.js');
relationsName = relationsName.relationsName;

Bill.all = function (callback) {
    database.all("SELECT * FROM bills", Bill, callback);
}

Bill.get = function (id, callback) {
    database.get("SELECT * FROM bills WHERE bill_id = ?", [id],Bill,callback);
}

Bill.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE bills SET Value = ? WHERE bill_id = ?",[this.Value,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO bills (Value) VALUES (?)", [this.Value],callback);
    }
}

Bill.many = function (model,id,callback){
    var tableName = "bills + '_' ${model}.toLowerCase() + 's'";
    var tableName2 = "${model}.toLowerCase() + 's_' + bills";

    if(relationsName.includes(tableName)){
        database.where('SELECT bills.* FROM bills INNER JOIN ' +  tableName + ' ON ' + 
        tableName +'.bill_id = bills.bill_id WHERE ' + tableName + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }else{
        database.where('SELECT bills.* FROM bills INNER JOIN ' +  tableName2 + ' ON ' + 
        tableName2 +'.bill_id = bills.bill_id WHERE ' + tableName2 + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }

}


Bill.delete = function(id, callback){
    database.run("DELETE FROM bills WHERE bill_id = ?",[id],callback);  
}

Bill.top = function (property,order,limit,callback) {
    var dbprop = Object.keys(Bill.mappingDBtoObject).find(key => Bill.mappingDBtoObject[key] == property);
    var tableName = "Bill".toLowerCase() + "s";
    database.where(`SELECT * FROM ${tableName} ORDER BY ${dbprop} ${order} LIMIT ?`, [limit], Bill, callback);
}

Bill.mappingDBtoObject = {
    Value:'Value',bill_id:'id'      
}

module.exports = Bill;