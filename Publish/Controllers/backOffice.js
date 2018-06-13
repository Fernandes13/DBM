var express = require('express');
var router = express.Router();

var Categoria = require("../Models/Categoria.js");
var Classificacao = require("../Models/Classificacao.js");
var Distribuidora = require("../Models/Distribuidora.js");
var Fatura = require("../Models/Fatura.js");
var Produto = require("../Models/Produto.js");
var Registo = require("../Models/Registo.js");
var Utilizador = require("../Models/Utilizador.js");
var Venda = require("../Models/Venda.js");


router.get('/Categoria', function (req, res) {
    Categoria.all(function (rows) {
        res.render('list', {
            title: 'Categoria',
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Categoria/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Categoria/Editar/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new Categoria()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Categoria/Detalhe/:id', function (req, res) {
    Categoria.get(req.params.id,function(row){
        if(row){

            res.render('detail',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                })
            });

        }
    });
});

router.get('/Categoria/Inserir', function (req, res) {
    var obj = new Categoria();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});



router.get('/Classificacao', function (req, res) {
    Classificacao.all(function (rows) {
        res.render('list', {
            title: 'Classificacao',
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Classificacao/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Classificacao/Editar/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new Classificacao()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Classificacao/Detalhe/:id', function (req, res) {
    Classificacao.get(req.params.id,function(row){
        if(row){

            res.render('detail',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                })
            });

        }
    });
});

router.get('/Classificacao/Inserir', function (req, res) {
    var obj = new Classificacao();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});



router.get('/Distribuidora', function (req, res) {
    Distribuidora.all(function (rows) {
        res.render('list', {
            title: 'Distribuidora',
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Distribuidora/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Distribuidora/Editar/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new Distribuidora()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Distribuidora/Detalhe/:id', function (req, res) {
    Distribuidora.get(req.params.id,function(row){
        if(row){

            res.render('detail',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                })
            });

        }
    });
});

router.get('/Distribuidora/Inserir', function (req, res) {
    var obj = new Distribuidora();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});



router.get('/Fatura', function (req, res) {
    Fatura.all(function (rows) {
        res.render('list', {
            title: 'Fatura',
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Fatura/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Fatura/Editar/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new Fatura()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Fatura/Detalhe/:id', function (req, res) {
    Fatura.get(req.params.id,function(row){
        if(row){

            res.render('detail',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                })
            });

        }
    });
});

router.get('/Fatura/Inserir', function (req, res) {
    var obj = new Fatura();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});



router.get('/Produto', function (req, res) {
    Produto.all(function (rows) {
        res.render('list', {
            title: 'Produto',
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Produto/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Produto/Editar/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new Produto()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Produto/Detalhe/:id', function (req, res) {
    Produto.get(req.params.id,function(row){
        if(row){

            res.render('detail',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                })
            });

        }
    });
});

router.get('/Produto/Inserir', function (req, res) {
    var obj = new Produto();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});



router.get('/Registo', function (req, res) {
    Registo.all(function (rows) {
        res.render('list', {
            title: 'Registo',
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Registo/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Registo/Editar/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new Registo()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Registo/Detalhe/:id', function (req, res) {
    Registo.get(req.params.id,function(row){
        if(row){

            res.render('detail',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                })
            });

        }
    });
});

router.get('/Registo/Inserir', function (req, res) {
    var obj = new Registo();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});



router.get('/Utilizador', function (req, res) {
    Utilizador.all(function (rows) {
        res.render('list', {
            title: 'Utilizador',
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Utilizador/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Utilizador/Editar/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new Utilizador()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Utilizador/Detalhe/:id', function (req, res) {
    Utilizador.get(req.params.id,function(row){
        if(row){

            res.render('detail',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                })
            });

        }
    });
});

router.get('/Utilizador/Inserir', function (req, res) {
    var obj = new Utilizador();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});



router.get('/Venda', function (req, res) {
    Venda.all(function (rows) {
        res.render('list', {
            title: 'Venda',
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Venda/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Venda/Editar/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            }),
            columns: Object.keys(new Venda()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Venda/Detalhe/:id', function (req, res) {
    Venda.get(req.params.id,function(row){
        if(row){

            res.render('detail',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                })
            });

        }
    });
});

router.get('/Venda/Inserir', function (req, res) {
    var obj = new Venda();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});



module.exports = router;