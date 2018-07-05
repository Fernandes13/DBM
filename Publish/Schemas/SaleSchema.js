module.exports = {
    "title": "Sale",
    "description": "NetFunlix sales",
    "type": "object",
  
    "properties": {
      "DateSale": {
        "description": "Date on which the sale was made",
        "type": "text",
        "pattern": "^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)/d/d$"
      }
    },
  
    "required": ["DateSale"],
  
    "references": [
      {
        "model": "Product",
        "relation": "M-M",
        "label": "product_id"
      },
      {
        "model": "Bill",
        "relation": "1-1",
        "isParent": true,
        "label": "bill_id"
      }
    ]
  }
  