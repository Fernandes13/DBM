module.exports = {
    "title": "User",
    "description": "NetFunlix User",
    "type": "object",
  
    "properties": {
      "Name": {
        "description": "Username",
        "type": "text",
        "pattern": "^[A-Z][a-z]{2,}$"
      },
      "DateBirth": {
        "description": "User's date of birth",
        "type": "text",
        "pattern": "^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)/d/d$"

      },
      "Balance": {
        "description": "User balance",
        "type": "real",
        "minimum": 0.0
      }
    },
  
    "required": ["Name","DateBirth"],
  
    "references": [
      {
        "model": "Bill",
        "relation": "1-M",
        "isParent": true
      },
      {
          "model": "Register",
          "relation": "1-1",
          "isParent": true
      }
    ]
  }
  