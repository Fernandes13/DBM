var express = require('express');
var router = express.Router();
var fs = require("fs");
var configs = JSON.parse(fs.readFileSync('./Server/config.json'));

var Distributor = require("../Models/Distributor.js");
var modelDistributor = require("../Schemas/DistributorSchema.js");
var Bill = require("../Models/Bill.js");
var modelBill = require("../Schemas/BillSchema.js");
var Product = require("../Models/Product.js");
var modelProduct = require("../Schemas/ProductSchema.js");
var Register = require("../Models/Register.js");
var modelRegister = require("../Schemas/RegisterSchema.js");
var Sale = require("../Models/Sale.js");
var modelSale = require("../Schemas/SaleSchema.js");
var User = require("../Models/User.js");
var modelUser = require("../Schemas/UserSchema.js");


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
                        link: './Distributor/Details/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: './Distributor/Edit/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Edit'
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
            }),
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        });
    });
});

router.get('/Distributor/Details/:id', function (req, res) {
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
                            model: ref.model,
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            },
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        })
    });
});


router.get('/Distributor/Insert', function (req, res) {
    var obj = new Distributor();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key
                    };
        }),
        models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
    });
});

/*router.get('/Distributor/Insert', function (req, res) {
	var obj = new Distributor();
    Distributor.all(function (row) {
		res.render('form', {
            title: "Distributor",
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
            references1M: function () {
            var MRefs = [];
                if (modelDistributor.references) {
                    modelDistributor.references.filter(mod => mod.relation == "1-M").forEach(function (ref) {
                        console.log("referencia: " + ref);
                        MRefs.push({
                            label: ref.label,
                            model: ref.model,
                            values: row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return MRefs;
            },
			referencesMM: function() {
				var MMRefs = [];
				if(modelDistributor.references) {
					modelDistributor.references.filter(mod => mod.relation == "M-M").forEach(function (ref) {
						MMRefs.push({
							label: ref.label,
							model: ref.model,
							values: ref.model + '/' + ref.params.id
						});
					});
				}
				return MMRefs;
			},
			get hasReferences() {
                return this.references1M().length > 0 || this.referencesMM().length > 0;
            },
            models: function() {
                return configs.models.map(elem =>{
                    return {
                        name: elem.name,
                        href: elem.href
                    }
                })
            }
		});
    });
});
*/


router.get('/Distributor/Edit/:id', function (req, res) {
    Distributor.get(req.params.id,function(row){
        if(row){
            res.render('form',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                }),
                models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
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
                        link: './Bill/Details/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: './Bill/Edit/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Edit'
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
            }),
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        });
    });
});

router.get('/Bill/Details/:id', function (req, res) {
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
                            model: ref.model,
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            },
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        })
    });
});


router.get('/Bill/Insert', function (req, res) {
    var obj = new Bill();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key
                    };
        }),
        models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
    });
});

/*router.get('/Bill/Insert', function (req, res) {
	var obj = new Bill();
    Bill.all(function (row) {
		res.render('form', {
            title: "Bill",
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
            references1M: function () {
            var MRefs = [];
                if (modelBill.references) {
                    modelBill.references.filter(mod => mod.relation == "1-M").forEach(function (ref) {
                        console.log("referencia: " + ref);
                        MRefs.push({
                            label: ref.label,
                            model: ref.model,
                            values: row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return MRefs;
            },
			referencesMM: function() {
				var MMRefs = [];
				if(modelBill.references) {
					modelBill.references.filter(mod => mod.relation == "M-M").forEach(function (ref) {
						MMRefs.push({
							label: ref.label,
							model: ref.model,
							values: ref.model + '/' + ref.params.id
						});
					});
				}
				return MMRefs;
			},
			get hasReferences() {
                return this.references1M().length > 0 || this.referencesMM().length > 0;
            },
            models: function() {
                return configs.models.map(elem =>{
                    return {
                        name: elem.name,
                        href: elem.href
                    }
                })
            }
		});
    });
});
*/


router.get('/Bill/Edit/:id', function (req, res) {
    Bill.get(req.params.id,function(row){
        if(row){
            res.render('form',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                }),
                models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
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
                        link: './Product/Details/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: './Product/Edit/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Edit'
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
            }),
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        });
    });
});

router.get('/Product/Details/:id', function (req, res) {
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
                            model: ref.model,
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            },
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        })
    });
});


router.get('/Product/Insert', function (req, res) {
    var obj = new Product();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key
                    };
        }),
        models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
    });
});

/*router.get('/Product/Insert', function (req, res) {
	var obj = new Product();
    Product.all(function (row) {
		res.render('form', {
            title: "Product",
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
            references1M: function () {
            var MRefs = [];
                if (modelProduct.references) {
                    modelProduct.references.filter(mod => mod.relation == "1-M").forEach(function (ref) {
                        console.log("referencia: " + ref);
                        MRefs.push({
                            label: ref.label,
                            model: ref.model,
                            values: row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return MRefs;
            },
			referencesMM: function() {
				var MMRefs = [];
				if(modelProduct.references) {
					modelProduct.references.filter(mod => mod.relation == "M-M").forEach(function (ref) {
						MMRefs.push({
							label: ref.label,
							model: ref.model,
							values: ref.model + '/' + ref.params.id
						});
					});
				}
				return MMRefs;
			},
			get hasReferences() {
                return this.references1M().length > 0 || this.referencesMM().length > 0;
            },
            models: function() {
                return configs.models.map(elem =>{
                    return {
                        name: elem.name,
                        href: elem.href
                    }
                })
            }
		});
    });
});
*/


router.get('/Product/Edit/:id', function (req, res) {
    Product.get(req.params.id,function(row){
        if(row){
            res.render('form',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                }),
                models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
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
                        link: './Register/Details/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: './Register/Edit/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Edit'
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
            }),
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        });
    });
});

router.get('/Register/Details/:id', function (req, res) {
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
                            model: ref.model,
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            },
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        })
    });
});


router.get('/Register/Insert', function (req, res) {
    var obj = new Register();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key
                    };
        }),
        models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
    });
});

/*router.get('/Register/Insert', function (req, res) {
	var obj = new Register();
    Register.all(function (row) {
		res.render('form', {
            title: "Register",
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
            references1M: function () {
            var MRefs = [];
                if (modelRegister.references) {
                    modelRegister.references.filter(mod => mod.relation == "1-M").forEach(function (ref) {
                        console.log("referencia: " + ref);
                        MRefs.push({
                            label: ref.label,
                            model: ref.model,
                            values: row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return MRefs;
            },
			referencesMM: function() {
				var MMRefs = [];
				if(modelRegister.references) {
					modelRegister.references.filter(mod => mod.relation == "M-M").forEach(function (ref) {
						MMRefs.push({
							label: ref.label,
							model: ref.model,
							values: ref.model + '/' + ref.params.id
						});
					});
				}
				return MMRefs;
			},
			get hasReferences() {
                return this.references1M().length > 0 || this.referencesMM().length > 0;
            },
            models: function() {
                return configs.models.map(elem =>{
                    return {
                        name: elem.name,
                        href: elem.href
                    }
                })
            }
		});
    });
});
*/


router.get('/Register/Edit/:id', function (req, res) {
    Register.get(req.params.id,function(row){
        if(row){
            res.render('form',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                }),
                models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
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
                        link: './Sale/Details/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: './Sale/Edit/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Edit'
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
            }),
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        });
    });
});

router.get('/Sale/Details/:id', function (req, res) {
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
                            model: ref.model,
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            },
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        })
    });
});


router.get('/Sale/Insert', function (req, res) {
    var obj = new Sale();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key
                    };
        }),
        models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
    });
});

/*router.get('/Sale/Insert', function (req, res) {
	var obj = new Sale();
    Sale.all(function (row) {
		res.render('form', {
            title: "Sale",
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
            references1M: function () {
            var MRefs = [];
                if (modelSale.references) {
                    modelSale.references.filter(mod => mod.relation == "1-M").forEach(function (ref) {
                        console.log("referencia: " + ref);
                        MRefs.push({
                            label: ref.label,
                            model: ref.model,
                            values: row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return MRefs;
            },
			referencesMM: function() {
				var MMRefs = [];
				if(modelSale.references) {
					modelSale.references.filter(mod => mod.relation == "M-M").forEach(function (ref) {
						MMRefs.push({
							label: ref.label,
							model: ref.model,
							values: ref.model + '/' + ref.params.id
						});
					});
				}
				return MMRefs;
			},
			get hasReferences() {
                return this.references1M().length > 0 || this.referencesMM().length > 0;
            },
            models: function() {
                return configs.models.map(elem =>{
                    return {
                        name: elem.name,
                        href: elem.href
                    }
                })
            }
		});
    });
});
*/


router.get('/Sale/Edit/:id', function (req, res) {
    Sale.get(req.params.id,function(row){
        if(row){
            res.render('form',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                }),
                models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
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
                        link: './User/Details/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: './User/Edit/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Edit'
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
            }),
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        });
    });
});

router.get('/User/Details/:id', function (req, res) {
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
                            model: ref.model,
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
                            row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            },
            models: function() {
            return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
        })
    });
});


router.get('/User/Insert', function (req, res) {
    var obj = new User();
    res.render('form',{
        properties: Object.getOwnPropertyNames(obj).map(key =>{
                    return {
                        name: key
                    };
        }),
        models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
    });
});

/*router.get('/User/Insert', function (req, res) {
	var obj = new User();
    User.all(function (row) {
		res.render('form', {
            title: "User",
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
            references1M: function () {
            var MRefs = [];
                if (modelUser.references) {
                    modelUser.references.filter(mod => mod.relation == "1-M").forEach(function (ref) {
                        console.log("referencia: " + ref);
                        MRefs.push({
                            label: ref.label,
                            model: ref.model,
                            values: row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return MRefs;
            },
			referencesMM: function() {
				var MMRefs = [];
				if(modelUser.references) {
					modelUser.references.filter(mod => mod.relation == "M-M").forEach(function (ref) {
						MMRefs.push({
							label: ref.label,
							model: ref.model,
							values: ref.model + '/' + ref.params.id
						});
					});
				}
				return MMRefs;
			},
			get hasReferences() {
                return this.references1M().length > 0 || this.referencesMM().length > 0;
            },
            models: function() {
                return configs.models.map(elem =>{
                    return {
                        name: elem.name,
                        href: elem.href
                    }
                })
            }
		});
    });
});
*/


router.get('/User/Edit/:id', function (req, res) {
    User.get(req.params.id,function(row){
        if(row){
            res.render('form',{
                properties: Object.getOwnPropertyNames(row).map(key =>{
                    return {
                        name: key,
                        value: row[key]
                    };
                }),
                models: function() {
           return configs.models.map(elem =>{
                return {
                    name: elem.name,
                    href: elem.href
                }
            })
        }
            });

        }
    });
});


module.exports = router;