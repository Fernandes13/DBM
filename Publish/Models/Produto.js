function Produto (Nome,Duracao,Categoria,Classificacao,DataLancamento) {
        this.Nome = Nome;
                 
        this.Duracao = Duracao;
                 
        this.Categoria = Categoria;
        Object.defineProperty(this,'Categoria',{ enumerable:false, writable:true});         
        this.Classificacao = Classificacao;
        Object.defineProperty(this,'Classificacao',{ enumerable:false, writable:true});         
        this.DataLancamento = DataLancamento;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'distribuidoraId',{ enumerable:false, writable:true});
        Object.defineProperty(this,'vendaId',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');

Produto.all = function (callback) {
    database.all("SELECT * FROM produtos", Produto, callback);
}

Produto.get = function (id, callback) {
    database.get("SELECT * FROM produtos WHERE produto_id = ?", [id],Produto,callback);
}

Produto.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE produtos SET Nome = ?,Duracao = ?,Categoria = ?,Classificacao = ?,DataLancamento = ? WHERE produto_id = ?",[this.Nome,this.Duracao,this.Categoria,this.Classificacao,this.DataLancamento,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO produtos (Nome,Duracao,Categoria,Classificacao,DataLancamento) VALUES (?,?,?,?,?)", [this.Nome,this.Duracao,this.Categoria,this.Classificacao,this.DataLancamento],callback);
    }
}

Produto.delete = function(id, callback){
    database.run("DELETE FROM produtos WHERE produto_id = ?",[id],callback);  
}

Produto.mappingDBtoObject = {
    nome:'Nome',duracao:'Duracao',categoria:'Categoria',classificacao:'Classificacao',datalancamento:'DataLancamento',produto_id:'id'
}

module.exports = Produto;