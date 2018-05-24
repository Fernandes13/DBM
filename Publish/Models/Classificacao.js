function Classificacao (Valor) {
        this.Valor = Valor;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'produtoId',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');

Classificacao.all = function (callback) {
    database.all("SELECT * FROM classificacaos", Classificacao, callback);
}

Classificacao.get = function (id, callback) {
    database.get("SELECT * FROM classificacaos WHERE classificacao_id = ?", [id],Classificacao,callback);
}

Classificacao.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE classificacaos SET Valor = ? WHERE classificacao_id = ?",[this.Valor,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO classificacaos (Valor) VALUES (?)", [this.Valor],callback);
    }
}

Classificacao.delete = function(id, callback){
    database.run("DELETE FROM classificacaos WHERE classificacao_id = ?",[id],callback);  
}

Classificacao.mappingDBtoObject = {
    valor:'Valor',classificacao_id:'id'
}

module.exports = Classificacao;