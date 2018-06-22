function Utilizador (Nome,DataNascimento,Saldo) {
        this.Nome = Nome;
                 
        this.DataNascimento = DataNascimento;
                 
        this.Saldo = Saldo;
        Object.defineProperty(this,'Saldo',{ enumerable:false, writable:true});         
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'fatura_id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'registo_id',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');

Utilizador.all = function (callback) {
    database.all("SELECT * FROM utilizadors", Utilizador, callback);
}

Utilizador.get = function (id, callback) {
    database.get("SELECT * FROM utilizadors WHERE utilizador_id = ?", [id],Utilizador,callback);
}

Utilizador.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE utilizadors SET Nome = ?,DataNascimento = ?,Saldo = ? WHERE utilizador_id = ?",[this.Nome,this.DataNascimento,this.Saldo,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO utilizadors (Nome,DataNascimento,Saldo) VALUES (?,?,?)", [this.Nome,this.DataNascimento,this.Saldo],callback);
    }
}

Utilizador.delete = function(id, callback){
    database.run("DELETE FROM utilizadors WHERE utilizador_id = ?",[id],callback);  
}

Utilizador.mappingDBtoObject = {
    Nome:'Nome',DataNascimento:'DataNascimento',Saldo:'Saldo',utilizador_id:'id'   
}

module.exports = Utilizador;