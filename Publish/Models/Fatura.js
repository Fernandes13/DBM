function Fatura (Valor) {
        this.Valor = Valor;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'vendaId',{ enumerable:false, writable:true});
        Object.defineProperty(this,'utilizadorId',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');

Fatura.all = function (callback) {
    database.all("SELECT * FROM faturas", Fatura, callback);
}

Fatura.get = function (id, callback) {
    database.get("SELECT * FROM faturas WHERE fatura_id = ?", [id],Fatura,callback);
}

Fatura.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE faturas SET Valor = ? WHERE fatura_id = ?",[this.Valor,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO faturas (Valor) VALUES (?)", [this.Valor],callback);
    }
}

Fatura.delete = function(id, callback){
    database.run("DELETE FROM faturas WHERE fatura_id = ?",[id],callback);  
}

Fatura.mappingDBtoObject = {
    valor:'Valor',fatura_id:'id'
}

module.exports = Fatura;