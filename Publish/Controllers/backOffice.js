var express = require('express');
var router = express.Router();
var fs = require("fs");

var Distributor = require("../Models/Distributor.js");
//var modelDistributor = JSON.parse(fs.readFileSync(__dirname + '/Model/Schemas/DistributorSchema.json'));
var Bill = require("../Models/Bill.js");
//var modelBill = JSON.parse(fs.readFileSync(__dirname + '/Model/Schemas/BillSchema.json'));
var Product = require("../Models/Product.js");
//var modelProduct = JSON.parse(fs.readFileSync(__dirname + '/Model/Schemas/ProductSchema.json'));
var Register = require("../Models/Register.js");
//var modelRegister = JSON.parse(fs.readFileSync(__dirname + '/Model/Schemas/RegisterSchema.json'));
var Sale = require("../Models/Sale.js");
//var modelSale = JSON.parse(fs.readFileSync(__dirname + '/Model/Schemas/SaleSchema.json'));
var User = require("../Models/User.js");
//var modelUser = JSON.parse(fs.readFileSync(__dirname + '/Model/Schemas/UserSchema.json'));


router.get('/Distributor', function (req, res) {
    Distributor.all(function (rows) {
        res.render('list', {
            title: 'Distributor',
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
                        link: './Distributor/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Distributor/Editar/' + obj.id,
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
            columns: Object.keys(new Distributor()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Distributor/Detalhe/:id', function (req, res) {
    Distributor.get(req.params.id,function(row){
        if(row){
            res.render('details',{
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

router.get('/Distributor/Detalhe/:id', function (req, res) {
    Distributor.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var allProps = Object.getOwnPropertyNames(row);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (modelDistributor.properties.hasOwnProperty(prop)) {
                        validProps.push({
                            name: prop,
                            value: row[prop]
                        });
                    }
            });
            return validProps;
            },
            references: function () {
            var allRefs = [];
                if (modelDistributor.references) {
                    modelDistributor.references.forEach(function (ref) {
                        allRefs.push({
                            label: ref.label,
                            model: "Distributor",
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        })
    });
});


router.get('/Distributor/Inserir', function (req, res) {
    var obj = new Distributor();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});

router.get('/Distributor/Editar/:id', function (req, res) {
    Distributor.get(req.params.id,function(row){
        if(row){
            res.render('form',{
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


router.get('/Bill', function (req, res) {
    Bill.all(function (rows) {
        res.render('list', {
            title: 'Bill',
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
                        link: './Bill/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Bill/Editar/' + obj.id,
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
            columns: Object.keys(new Bill()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Bill/Detalhe/:id', function (req, res) {
    Bill.get(req.params.id,function(row){
        if(row){
            res.render('details',{
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

router.get('/Bill/Detalhe/:id', function (req, res) {
    Bill.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var allProps = Object.getOwnPropertyNames(row);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (modelBill.properties.hasOwnProperty(prop)) {
                        validProps.push({
                            name: prop,
                            value: row[prop]
                        });
                    }
            });
            return validProps;
            },
            references: function () {
            var allRefs = [];
                if (modelBill.references) {
                    modelBill.references.forEach(function (ref) {
                        allRefs.push({
                            label: ref.label,
                            model: "Bill",
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        })
    });
});


router.get('/Bill/Inserir', function (req, res) {
    var obj = new Bill();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});

router.get('/Bill/Editar/:id', function (req, res) {
    Bill.get(req.params.id,function(row){
        if(row){
            res.render('form',{
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


router.get('/Product', function (req, res) {
    Product.all(function (rows) {
        res.render('list', {
            title: 'Product',
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
                        link: './Product/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Product/Editar/' + obj.id,
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
            columns: Object.keys(new Product()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Product/Detalhe/:id', function (req, res) {
    Product.get(req.params.id,function(row){
        if(row){
            res.render('details',{
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

router.get('/Product/Detalhe/:id', function (req, res) {
    Product.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var allProps = Object.getOwnPropertyNames(row);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (modelProduct.properties.hasOwnProperty(prop)) {
                        validProps.push({
                            name: prop,
                            value: row[prop]
                        });
                    }
            });
            return validProps;
            },
            references: function () {
            var allRefs = [];
                if (modelProduct.references) {
                    modelProduct.references.forEach(function (ref) {
                        allRefs.push({
                            label: ref.label,
                            model: "Product",
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        })
    });
});


router.get('/Product/Inserir', function (req, res) {
    var obj = new Product();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});

router.get('/Product/Editar/:id', function (req, res) {
    Product.get(req.params.id,function(row){
        if(row){
            res.render('form',{
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


router.get('/Register', function (req, res) {
    Register.all(function (rows) {
        res.render('list', {
            title: 'Register',
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
                        link: './Register/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Register/Editar/' + obj.id,
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
            columns: Object.keys(new Register()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Register/Detalhe/:id', function (req, res) {
    Register.get(req.params.id,function(row){
        if(row){
            res.render('details',{
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

router.get('/Register/Detalhe/:id', function (req, res) {
    Register.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var allProps = Object.getOwnPropertyNames(row);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (modelRegister.properties.hasOwnProperty(prop)) {
                        validProps.push({
                            name: prop,
                            value: row[prop]
                        });
                    }
            });
            return validProps;
            },
            references: function () {
            var allRefs = [];
                if (modelRegister.references) {
                    modelRegister.references.forEach(function (ref) {
                        allRefs.push({
                            label: ref.label,
                            model: "Register",
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        })
    });
});


router.get('/Register/Inserir', function (req, res) {
    var obj = new Register();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});

router.get('/Register/Editar/:id', function (req, res) {
    Register.get(req.params.id,function(row){
        if(row){
            res.render('form',{
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


router.get('/Sale', function (req, res) {
    Sale.all(function (rows) {
        res.render('list', {
            title: 'Sale',
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
                        link: './Sale/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './Sale/Editar/' + obj.id,
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
            columns: Object.keys(new Sale()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/Sale/Detalhe/:id', function (req, res) {
    Sale.get(req.params.id,function(row){
        if(row){
            res.render('details',{
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

router.get('/Sale/Detalhe/:id', function (req, res) {
    Sale.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var allProps = Object.getOwnPropertyNames(row);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (modelSale.properties.hasOwnProperty(prop)) {
                        validProps.push({
                            name: prop,
                            value: row[prop]
                        });
                    }
            });
            return validProps;
            },
            references: function () {
            var allRefs = [];
                if (modelSale.references) {
                    modelSale.references.forEach(function (ref) {
                        allRefs.push({
                            label: ref.label,
                            model: "Sale",
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        })
    });
});


router.get('/Sale/Inserir', function (req, res) {
    var obj = new Sale();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});

router.get('/Sale/Editar/:id', function (req, res) {
    Sale.get(req.params.id,function(row){
        if(row){
            res.render('form',{
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


router.get('/User', function (req, res) {
    User.all(function (rows) {
        res.render('list', {
            title: 'User',
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
                        link: './User/Detalhe/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './User/Editar/' + obj.id,
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
            columns: Object.keys(new User()).map(key => {
                return {
                    name: key
                };
            })
        });
    });
});

router.get('/User/Detalhe/:id', function (req, res) {
    User.get(req.params.id,function(row){
        if(row){
            res.render('details',{
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

router.get('/User/Detalhe/:id', function (req, res) {
    User.get(req.params.id, function (row) {
        res.render('details', {
            properties: function () {
                var allProps = Object.getOwnPropertyNames(row);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (modelUser.properties.hasOwnProperty(prop)) {
                        validProps.push({
                            name: prop,
                            value: row[prop]
                        });
                    }
            });
            return validProps;
            },
            references: function () {
            var allRefs = [];
                if (modelUser.references) {
                    modelUser.references.forEach(function (ref) {
                        allRefs.push({
                            label: ref.label,
                            model: "User",
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        })
    });
});


router.get('/User/Inserir', function (req, res) {
    var obj = new User();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key,
                        value: obj[key]
                    };
        })
    });
});

router.get('/User/Editar/:id', function (req, res) {
    User.get(req.params.id,function(row){
        if(row){
            res.render('form',{
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


module.exports = router;