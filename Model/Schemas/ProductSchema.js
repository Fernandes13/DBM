module.exports = {
    "title": "Product",
    "description": "Product marketed by NetFunlix",
    "type": "object",
  
    "properties": {
      "Name": {
        "description": "Product name",
        "type": "text",
        "pattern": "^[A-Z][a-z]{2,}$"
      },
  
      "Duration": {
        "description": "Product duration in hours",
        "type": "real",
        "minimum": 0.1
      },

      "Category": {
        "description": "Category designation",
        "type": "text"
      },

      "Classification": {
        "description": "Value of the product classification",
        "type": "real",
        "minimum": 0.1,
        "maximum": 5.0
      },
  
      "ReleaseDate": {
        "description": "Product Release Date",
        "type": "text",
        "pattern": "^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)/d/d$"
      },

      "Price":{
        "description":"Product's price",
        "type":"real",
        "minumum": 4.99
      }
  
    },
  
    "required": ["Name", "Duration", "ReleaseDate", "Price"],
  
    "references": [
      {
        "model": "Distributor",
        "relation": "1-M",
        "isParent": true,
        "label": "distributor_id"
      },
      {
        "model": "Sale",
        "relation": "M-M",
        "isParent": true,
        "label": "distributor_id"
      }
    ]
  }