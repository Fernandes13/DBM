var express = require('express');
var app = express();


app.get('/Aluno',function(req,res){
       res.send('View: Backoffice Aluno');
});

app.get('/Aluno/detalhe/:id',function(req,res){
    res.send('View: Backoffice Aluno Detalhe');
});


app.get('/Professor',function(req,res){
       res.send('View: Backoffice Professor');
});

app.get('/Professor/detalhe/:id',function(req,res){
    res.send('View: Backoffice Professor Detalhe');
});


app.get('/Turma',function(req,res){
       res.send('View: Backoffice Turma');
});

app.get('/Turma/detalhe/:id',function(req,res){
    res.send('View: Backoffice Turma Detalhe');
});

