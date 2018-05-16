function Aluno (numero,nome,morada,nota) {
        this.numero = numero;
                 
        this.nome = nome;
                 
        this.morada = morada;
        Object.defineProperty(this,'morada',{ enumerable:false});         
        this.nota = nota;
                 
        Object.defineProperty(this,'id',{ enumerable:false});
}

var database = require('./sqlite.js')('labs.db');

Aluno.all = function (callback) {
    database.all("SELECT * FROM alunos", Aluno, callback);
}

Aluno.get = function (id, callback) {
    database.get("SELECT * FROM alunos WHERE aluno_id = ?", [id],Aluno,callback);
}

Aluno.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE alunos SET numero = ?,nome = ?,morada = ?,nota = ? WHERE aluno_id = ?",[this.numero,this.nome,this.morada,this.nota,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO alunos (numero,nome,morada,nota) VALUES (?,?,?,?)", [this.numero,this.nome,this.morada,this.nota],callback);
    }
}

Aluno.mappingDBtoObject = {
    numero:'numero',nome:'nome',morada:'morada',nota:'nota',aluno_id:'id'
}

module.exports = Aluno;