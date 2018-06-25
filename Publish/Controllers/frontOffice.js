var express = require('express');
var router = express.Router();
var Product = require("../Models/Product.js");
var currentModels = require("../Models/Models.js");

router.get('/', function (req, res) {
    Product.top("Price", "DESC", 3, function (rows) {
        res.render('frontOffice', {
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    })
                }
            }),
            columns: Object.keys(new Product()).map(key => {
                return {
                    name: key
                };
            }),
            models: function(){

                return currentModels.models.map(model=>{
                    return {
                        name: model.name,
                        href: model.href
                    }
                });
            }
        });
    });
});

module.exports = router;