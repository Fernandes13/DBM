function Aluno (numero,nome,morada,nota) {
this.numero=numero;
this.nome=nome;
Object.defineProperty(this, 'morada',{enumerable: false});
this.nota=nota;

}
