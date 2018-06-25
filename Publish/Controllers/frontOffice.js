var express = require('express');
var router = express.Router();
var Product = require("../Models/Product.js");

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
            })
        });
    });
});

module.exports = router;