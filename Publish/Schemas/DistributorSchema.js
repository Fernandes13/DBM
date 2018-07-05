module.exports = {
    "title": "Distributor",
    "description": "NetFunlix Product Distributor",
    "type": "object",
  
    "properties": {
      "Name": {
        "description": "Distribution name",
        "type": "text",
        "pattern": "^[A-Z][a-z]{2,}$",
        "unique": 1
      },
  
      "Value": {
        "description": "Distributor's monetary value",
        "type": "real",
        "minimum": 0.1
      }
    },
  
    "required": ["Name", "Value"],
  
    "references": [
      {
        "model": "Product",
        "relation": "1-M",
        "isParent": false,
        "label": "Product Name"
      }
      
    ]
  }
  