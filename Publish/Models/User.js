function User (Name,DateBirth,Balance) {
        this.Name = Name;
                 
        this.DateBirth = DateBirth;
                 
        this.Balance = Balance;
        Object.defineProperty(this,'Balance',{ enumerable:false, writable:true});         
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'bill_id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'register_id',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');
var relationsName = require('../index.js');
relationsName = relationsName.relationsName;

User.all = function (callback) {
    database.all("SELECT * FROM users", User, callback);
}

User.get = function (id, callback) {
    database.get("SELECT * FROM users WHERE user_id = ?", [id],User,callback);
}

User.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE users SET Name = ?,DateBirth = ?,Balance = ? WHERE user_id = ?",[this.Name,this.DateBirth,this.Balance,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO users (Name,DateBirth,Balance) VALUES (?,?,?)", [this.Name,this.DateBirth,this.Balance],callback);
    }
}

User.many = function (model,id,callback){
    var tableName = "users + '_' ${model}.toLowerCase() + 's'";
    var tableName2 = "${model}.toLowerCase() + 's_' + users";

    if(relationsName.includes(tableName)){
        database.where('SELECT users.* FROM users INNER JOIN ' +  tableName + ' ON ' + 
        tableName +'.user_id = users.user_id WHERE ' + tableName + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }else{
        database.where('SELECT users.* FROM users INNER JOIN ' +  tableName2 + ' ON ' + 
        tableName2 +'.user_id = users.user_id WHERE ' + tableName2 + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }

}


User.delete = function(id, callback){
    database.run("DELETE FROM users WHERE user_id = ?",[id],callback);  
}

User.top = function (property,order,limit,callback) {
    var dbprop = Object.keys(User.mappingDBtoObject).find(key => User.mappingDBtoObject[key] == property);
    var tableName = "User".toLowerCase() + "s";
    database.where(`SELECT * FROM ${tableName} ORDER BY ${dbprop} ${order} LIMIT ?`, [limit], User, callback);
}

User.mappingDBtoObject = {
    Name:'Name',DateBirth:'DateBirth',Balance:'Balance',user_id:'id'
}

module.exports = User;