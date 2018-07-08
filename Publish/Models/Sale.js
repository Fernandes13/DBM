function Sale (DateSale) {
        this.DateSale = DateSale;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'product_id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'bill_id',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');
var relationsName = require('../index.js');
relationsName = relationsName.relationsName;

Sale.all = function (callback) {
    database.all("SELECT * FROM sales", Sale, callback);
}

Sale.get = function (id, callback) {
    database.get("SELECT * FROM sales WHERE sale_id = ?", [id],Sale,callback);
}

Sale.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE sales SET DateSale = ? WHERE sale_id = ?",[this.DateSale,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO sales (DateSale) VALUES (?)", [this.DateSale],callback);
    }
}

Sale.many = function (model,id,callback){
    var tableName = "sales + '_' ${model}.toLowerCase() + 's'";
    var tableName2 = "${model}.toLowerCase() + 's_' + sales";

    if(relationsName.includes(tableName)){
        database.where('SELECT sales.* FROM sales INNER JOIN ' +  tableName + ' ON ' + 
        tableName +'.sale_id = sales.sale_id WHERE ' + tableName + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }else{
        database.where('SELECT sales.* FROM sales INNER JOIN ' +  tableName2 + ' ON ' + 
        tableName2 +'.sale_id = sales.sale_id WHERE ' + tableName2 + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }

}


Sale.delete = function(id, callback){
    database.run("DELETE FROM sales WHERE sale_id = ?",[id],callback);  
}

Sale.top = function (property,order,limit,callback) {
    var dbprop = Object.keys(Sale.mappingDBtoObject).find(key => Sale.mappingDBtoObject[key] == property);
    var tableName = "Sale".toLowerCase() + "s";
    database.where(`SELECT * FROM ${tableName} ORDER BY ${dbprop} ${order} LIMIT ?`, [limit], Sale, callback);
}

Sale.mappingDBtoObject = {
    DateSale:'DateSale',sale_id:'id' , product_id : 'product_id'  , bill_id : 'bill_id' 
}

module.exports = Sale;