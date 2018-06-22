function Distribuidora (Nome,Valor) {
        this.Nome = Nome;
                 
        this.Valor = Valor;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'produto_id',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');

Distribuidora.all = function (callback) {
    database.all("SELECT * FROM distribuidoras", Distribuidora, callback);
}

Distribuidora.get = function (id, callback) {
    database.get("SELECT * FROM distribuidoras WHERE distribuidora_id = ?", [id],Distribuidora,callback);
}

Distribuidora.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE distribuidoras SET Nome = ?,Valor = ? WHERE distribuidora_id = ?",[this.Nome,this.Valor,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO distribuidoras (Nome,Valor) VALUES (?,?)", [this.Nome,this.Valor],callback);
    }
}

Distribuidora.delete = function(id, callback){
    database.run("DELETE FROM distribuidoras WHERE distribuidora_id = ?",[id],callback);  
}

Distribuidora.mappingDBtoObject = {
    Nome:'Nome',Valor:'Valor',distribuidora_id:'id'   
}

module.exports = Distribuidora;