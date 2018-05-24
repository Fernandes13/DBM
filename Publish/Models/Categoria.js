function Categoria (Designacao) {
        this.Designacao = Designacao;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'produtoId',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');

Categoria.all = function (callback) {
    database.all("SELECT * FROM categorias", Categoria, callback);
}

Categoria.get = function (id, callback) {
    database.get("SELECT * FROM categorias WHERE categoria_id = ?", [id],Categoria,callback);
}

Categoria.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE categorias SET Designacao = ? WHERE categoria_id = ?",[this.Designacao,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO categorias (Designacao) VALUES (?)", [this.Designacao],callback);
    }
}

Categoria.delete = function(id, callback){
    database.run("DELETE FROM categorias WHERE categoria_id = ?",[id],callback);  
}

Categoria.mappingDBtoObject = {
    designacao:'Designacao',categoria_id:'id'
}

module.exports = Categoria;