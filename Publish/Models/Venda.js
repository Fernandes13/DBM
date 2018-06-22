function Venda (DataVenda) {
        this.DataVenda = DataVenda;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'produto_id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'fatura_id',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');

Venda.all = function (callback) {
    database.all("SELECT * FROM vendas", Venda, callback);
}

Venda.get = function (id, callback) {
    database.get("SELECT * FROM vendas WHERE venda_id = ?", [id],Venda,callback);
}

Venda.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE vendas SET DataVenda = ? WHERE venda_id = ?",[this.DataVenda,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO vendas (DataVenda) VALUES (?)", [this.DataVenda],callback);
    }
}

Venda.many = function (model,id,callback){
    database.where('SELECT vendas.* FROM vendas INNER JOIN ${model}_vendas ON ${model}_vendas.venda_id = vendas.venda_id WHERE ${model}_vendas.${model.toLowerCase()}_id = ?', [id], Venda, callback)
}


Venda.delete = function(id, callback){
    database.run("DELETE FROM vendas WHERE venda_id = ?",[id],callback);  
}

Venda.mappingDBtoObject = {
    DataVenda:'DataVenda',venda_id:'id'      
}

module.exports = Venda;