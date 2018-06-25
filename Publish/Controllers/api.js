var express = require('express');
var router = express.Router();
var Distributor = require('../Models/Distributor');
var Bill = require('../Models/Bill');
var Product = require('../Models/Product');
var Register = require('../Models/Register');
var Sale = require('../Models/Sale');
var User = require('../Models/User');

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

router.post('/Distributor', function(req,res){
    mapping(req.body,Distributor).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo Distributor
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/Distributor', function(req,res){
    Distributor.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Distributor/:id', function(req,res){
    Distributor.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.get('Distributor/:model/:id', function (req, res){
    Distributor.many(req.params.model, req.params.id, function (rows){
        res.json(rows);
    });
});

router.put('/Distributor/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Distributor);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Distributor/:id',function(req,res){
    Distributor.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/Bill', function(req,res){
    mapping(req.body,Bill).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo Bill
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/Bill', function(req,res){
    Bill.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Bill/:id', function(req,res){
    Bill.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.get('Bill/:model/:id', function (req, res){
    Bill.many(req.params.model, req.params.id, function (rows){
        res.json(rows);
    });
});

router.put('/Bill/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Bill);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Bill/:id',function(req,res){
    Bill.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/Product', function(req,res){
    mapping(req.body,Product).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo Product
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/Product', function(req,res){
    Product.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Product/:id', function(req,res){
    Product.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.get('Product/:model/:id', function (req, res){
    Product.many(req.params.model, req.params.id, function (rows){
        res.json(rows);
    });
});

router.put('/Product/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Product);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Product/:id',function(req,res){
    Product.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/Register', function(req,res){
    mapping(req.body,Register).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo Register
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/Register', function(req,res){
    Register.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Register/:id', function(req,res){
    Register.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.get('Register/:model/:id', function (req, res){
    Register.many(req.params.model, req.params.id, function (rows){
        res.json(rows);
    });
});

router.put('/Register/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Register);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Register/:id',function(req,res){
    Register.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/Sale', function(req,res){
    mapping(req.body,Sale).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo Sale
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/Sale', function(req,res){
    Sale.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Sale/:id', function(req,res){
    Sale.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.get('Sale/:model/:id', function (req, res){
    Sale.many(req.params.model, req.params.id, function (rows){
        res.json(rows);
    });
});

router.put('/Sale/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,Sale);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/Sale/:id',function(req,res){
    Sale.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});
router.post('/User', function(req,res){
    mapping(req.body,User).save(function(err){ //converte o objeto retornado no corpo do pedido num objeto do tipo User
        res.json({
            sucess: !err
        });
    }); 
});

router.get('/User', function(req,res){
    User.all(function(rows){//função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/User/:id', function(req,res){
    User.get(req.params.id, function(rows){
        res.json(rows);
    });
});

router.get('User/:model/:id', function (req, res){
    User.many(req.params.model, req.params.id, function (rows){
        res.json(rows);
    });
});

router.put('/User/:id',function(req,res){ //o id tanto poderia ir no corpo da mensagem como por parâmetro no url

    var obj = mapping(req.body,User);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto

    obj.save(function(err){ //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            sucess: !err
        });
    });
});

router.delete('/User/:id',function(req,res){
    User.delete(req.params.id, function(err){
        res.json({
            sucess: !err
        });
    });
});

module.exports = router;