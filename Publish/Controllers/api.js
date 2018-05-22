var express = require('express');
var router = express.Router();
var Aluno = require('../Models/Aluno');
var Professor = require('../Models/Professor');
var Turma = require('../Models/Turma');

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe
criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
*/
function mapping(object, type) {
    var obj = new type();
    console.log("valorOB: " + object);
    Object.keys(object).forEach(function (value) {
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
        });
    return obj;
}

router.post('/Aluno', function(req,res){
    mapping(req.body,Aluno).save();//converte o objeto retornado no corpo do pedido num objeto do tipo Aluno
});

router.get('/Aluno', function(req,res){
    Aluno.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Aluno/:id', function(req,res){
    Aluno.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.put('/Aluno/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Aluno);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    console.log("ID " + req.params.id);
    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Aluno/:id',function(req,res){
    Aluno.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/Professor', function(req,res){
    mapping(req.body,Professor).save(); //converte o objeto retornado no corpo do pedido num objeto do tipo Professor
});

router.get('/Professor', function(req,res){
    Professor.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Professor/:id', function(req,res){
    Professor.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.put('/Professor/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Professor);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Professor/:id',function(req,res){
    Professor.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/Turma', function(req,res){
    mapping(req.body,Turma).save(); //converte o objeto retornado no corpo do pedido num objeto do tipo Turma
});

router.get('/Turma', function(req,res){
    Turma.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Turma/:id', function(req,res){
    Turma.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.put('/Turma/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Turma);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Turma/:id',function(req,res){
    Turma.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});

module.exports = router;