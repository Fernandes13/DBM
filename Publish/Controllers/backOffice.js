var express = require('express');
var router = express.Router();


router.get('/Categoria',function(req,res){
       res.send('View: Backoffice Categoria');
});

router.get('/Categoria/detalhe/:id',function(req,res){
    res.send('View: Backoffice Categoria Detalhe');
});


router.get('/Classificacao',function(req,res){
       res.send('View: Backoffice Classificacao');
});

router.get('/Classificacao/detalhe/:id',function(req,res){
    res.send('View: Backoffice Classificacao Detalhe');
});


router.get('/Distribuidora',function(req,res){
       res.send('View: Backoffice Distribuidora');
});

router.get('/Distribuidora/detalhe/:id',function(req,res){
    res.send('View: Backoffice Distribuidora Detalhe');
});


router.get('/Fatura',function(req,res){
       res.send('View: Backoffice Fatura');
});

router.get('/Fatura/detalhe/:id',function(req,res){
    res.send('View: Backoffice Fatura Detalhe');
});


router.get('/Produto',function(req,res){
       res.send('View: Backoffice Produto');
});

router.get('/Produto/detalhe/:id',function(req,res){
    res.send('View: Backoffice Produto Detalhe');
});


router.get('/Registo',function(req,res){
       res.send('View: Backoffice Registo');
});

router.get('/Registo/detalhe/:id',function(req,res){
    res.send('View: Backoffice Registo Detalhe');
});


router.get('/Utilizador',function(req,res){
       res.send('View: Backoffice Utilizador');
});

router.get('/Utilizador/detalhe/:id',function(req,res){
    res.send('View: Backoffice Utilizador Detalhe');
});


router.get('/Venda',function(req,res){
       res.send('View: Backoffice Venda');
});

router.get('/Venda/detalhe/:id',function(req,res){
    res.send('View: Backoffice Venda Detalhe');
});


module.exports = router;