module.exports = {
    "title": "Bill",
    "description": "Bill issued by NetFunlix",
    "type": "object",
  
    "properties": {
      "Value": {
        "description": "Bill value",
        "type": "real",
        "minimum": 0.0
      }
    },
  
    "required": ["Value"],
  
    "references": [
      {
        "model": "Sale",
        "relation": "1-1",
        "isParent": false,
        "label": "sale_id"
      },
      {
        "model": "User",
        "relation": "1-M",
        "isParent": false,
        "label": "user_id"
      }
    ]
  }
  