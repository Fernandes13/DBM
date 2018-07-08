function Product (Name,Duration,Category,Classification,ReleaseDate,Price) {
        this.Name = Name;
                 
        this.Duration = Duration;
                 
        this.Category = Category;
        Object.defineProperty(this,'Category',{ enumerable:false, writable:true});         
        this.Classification = Classification;
        Object.defineProperty(this,'Classification',{ enumerable:false, writable:true});         
        this.ReleaseDate = ReleaseDate;
                 
        this.Price = Price;
                 
        Object.defineProperty(this,'id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'distributor_id',{ enumerable:false, writable:true});
        Object.defineProperty(this,'sale_id',{ enumerable:false, writable:true});
}

var database = require('../Database/sqlite.js')('./Publish/Database/NetFunlix.db');
var relationsName = require('../index.js');
relationsName = relationsName.relationsName;

Product.all = function (callback) {
    database.all("SELECT * FROM products", Product, callback);
}

Product.get = function (id, callback) {
    database.get("SELECT * FROM products WHERE product_id = ?", [id],Product,callback);
}

Product.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para UPDATE
       database.run("UPDATE products SET Name = ?,Duration = ?,Category = ?,Classification = ?,ReleaseDate = ?,Price = ? WHERE product_id = ?",[this.Name,this.Duration,this.Category,this.Classification,this.ReleaseDate,this.Price,this.id],callback);
    } else { //caso contrário para insert
        database.run("INSERT INTO products (Name,Duration,Category,Classification,ReleaseDate,Price) VALUES (?,?,?,?,?,?)", [this.Name,this.Duration,this.Category,this.Classification,this.ReleaseDate,this.Price],callback);
    }
}

Product.many = function (model,id,callback){
    var tableName = "products + '_' ${model}.toLowerCase() + 's'";
    var tableName2 = "${model}.toLowerCase() + 's_' + products";

    if(relationsName.includes(tableName)){
        database.where('SELECT products.* FROM products INNER JOIN ' +  tableName + ' ON ' + 
        tableName +'.product_id = products.product_id WHERE ' + tableName + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }else{
        database.where('SELECT products.* FROM products INNER JOIN ' +  tableName2 + ' ON ' + 
        tableName2 +'.product_id = products.product_id WHERE ' + tableName2 + '.${model.toLowerCase()}_id = ?', [id], Distributor, callback);
    }

}


Product.delete = function(id, callback){
    database.run("DELETE FROM products WHERE product_id = ?",[id],callback);  
}

Product.top = function (property,order,limit,callback) {
    var dbprop = Object.keys(Product.mappingDBtoObject).find(key => Product.mappingDBtoObject[key] == property);
    var tableName = "Product".toLowerCase() + "s";
    database.where(`SELECT * FROM ${tableName} ORDER BY ${dbprop} ${order} LIMIT ?`, [limit], Product, callback);
}

Product.mappingDBtoObject = {
    Name:'Name',Duration:'Duration',Category:'Category',Classification:'Classification',ReleaseDate:'ReleaseDate',Price:'Price',product_id:'id' , distributor_id : 'distributor_id'  , sale_id : 'sale_id' 
}

module.exports = Product;