var express = require('express');
var router = express.Router();
var Distribuidora = require('../Models/Distribuidora');
var Fatura = require('../Models/Fatura');
var Produto = require('../Models/Produto');
var Registo = require('../Models/Registo');
var Utilizador = require('../Models/Utilizador');
var Venda = require('../Models/Venda');

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe
criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
*/
function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
        });
    return obj;
}

router.post('/Distribuidora', function(req,res){
    mapping(req.body,Distribuidora).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo Distribuidora
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/Distribuidora', function(req,res){
    Distribuidora.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Distribuidora/:id', function(req,res){
    Distribuidora.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.put('/Distribuidora/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Distribuidora);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Distribuidora/:id',function(req,res){
    Distribuidora.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/Fatura', function(req,res){
    mapping(req.body,Fatura).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo Fatura
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/Fatura', function(req,res){
    Fatura.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Fatura/:id', function(req,res){
    Fatura.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.put('/Fatura/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Fatura);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Fatura/:id',function(req,res){
    Fatura.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/Produto', function(req,res){
    mapping(req.body,Produto).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo Produto
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/Produto', function(req,res){
    Produto.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Produto/:id', function(req,res){
    Produto.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.put('/Produto/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Produto);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Produto/:id',function(req,res){
    Produto.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/Registo', function(req,res){
    mapping(req.body,Registo).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo Registo
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/Registo', function(req,res){
    Registo.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Registo/:id', function(req,res){
    Registo.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.put('/Registo/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Registo);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Registo/:id',function(req,res){
    Registo.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/Utilizador', function(req,res){
    mapping(req.body,Utilizador).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo Utilizador
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/Utilizador', function(req,res){
    Utilizador.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Utilizador/:id', function(req,res){
    Utilizador.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.put('/Utilizador/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Utilizador);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Utilizador/:id',function(req,res){
    Utilizador.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/Venda', function(req,res){
    mapping(req.body,Venda).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo Venda
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/Venda', function(req,res){
    Venda.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Venda/:id', function(req,res){
    Venda.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.put('/Venda/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Venda);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Venda/:id',function(req,res){
    Venda.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});

module.exports = router;