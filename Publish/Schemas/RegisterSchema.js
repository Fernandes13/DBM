module.exports = {
    "title": "Register",
    "description": "Registering a user from the NetFunlix",
    "type": "object",
  
    "properties": {
      "Email": {
        "description": "User Email",
        "type": "text",
        "pattern": "",
        "unique": 1
      },
      "Username": {
        "description": "Username",
        "type": "text",
        "pattern": "^[A-Z][a0-z9]{2,}$"

      },
      "Password": {
        "description": "User password",
        "type": "text",
        "pattern": ""
      }
    },
  
    "required": ["Email","Username","Password"],
  
    "references": [
      {
        "model": "User",
        "relation": "1-1"
      }
    ]
  }
  