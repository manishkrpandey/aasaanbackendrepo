const dbManager = require('../config/db_manager');
const symbols = require('../config/symbols');
const common = require('../lib/common');


module.exports.registerCustomer = function(callback) {
    dbManager.insertData(symbols.TABLE_CUSTOMERS)
        .then( insertId => {
            callback(insertId);
        })
        .catch(err=>{
            callback(0);
            //??? log error
        });
}

module.exports.customerCreate = function(callback) {
    
    dbManager.updateData(symbols.TABLE_CUSTOMERS,symbols.REQUEST_DATA)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

// module.exports.login = function(callback) {
//     data = symbols.REQUEST_DATA;
//     var sql = "select * from " + symbols.TABLE_CUSTOMERS + " where mobile_number = '" + data['mobile_number'] + "' and "+
//                 " password = '" + data['password'] +"' and is_deleted = false and is_verified = true and is_active = true;";
//     dbManager.getData(sql)
//         .then( result => {
//             var remember_token = "new_token";//code to generate
//             dbManager.updateData(symbols.TABLE_CUSTOMERS , {"remember_token":remember_token,"id":result[0].id})
//                 .then( success => {
//                     callback(true,remember_token);
//                 })
//                 .catch(err=>{
//                     console.log(err);
//                     callback(false);
//                     //??? log error
//                 });
//         })
//         .catch(err=>{
//             callback(false);
//             //??? log error
//         });
// }

module.exports.customerRetrieve = function(accessFlag = symbols.FLAG_CUSTOMER ,callback) {
    data = symbols.REQUEST_DATA;
    var sql = "";
    var tblName = symbols.TABLE_CUSTOMERS;
    if(accessFlag == symbols.FLAG_CUSTOMER){
        tblName = "";
        sql = "select * from " + symbols.TABLE_CUSTOMERS + " where id = '" + data['id'] + "' and is_deleted = false;";
    }
    dbManager.getData(sql,tblName)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            // console.log(err);
            callback(false);
            //??? log error
        });
}

module.exports.customerUpdate = function(data = {}, callback){

    if(common.isEmptyObject(data)){
        data = symbols.REQUEST_DATA;
    }
    dbManager.updateData(symbols.TABLE_CUSTOMERS, data)
        .then( success => {
            console.log("2");
            callback(true);
        })
        .catch(err=>{
            console.log("3");
            callback(false);
            //??? log error
        });
}

module.exports.customerAddressCreate = function(callback) {
    dbManager.insertData(symbols.TABLE_CUSTOMER_ADDRESS)
        .then( insertId => {
            callback(insertId);
        })
        .catch(err=>{
            callback(0);
            //??? log error
        });
}

module.exports.customerAddressRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_CUSTOMER_ADDRESS+" WHERE customer_id = '"+ data['customer_id']+"'";
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.customerAddressUpdate = function(callback) {
    dbManager.updateData(symbols.TABLE_CUSTOMER_ADDRESS, symbols.REQUEST_DATA)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.customerAddressDelete = function(callback) {

    dbManager.deleteData(symbols.TABLE_CUSTOMER_ADDRESS, symbols.REQUEST_DATA['id'])
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            console.log(err);
            callback(false);
            //??? log error
        });
}

module.exports.saveOtp = function(otp, callback) {
    data = symbols.REQUEST_DATA;
    data['otp'] = otp;
    dbManager.getData('',symbols.TABLE_CUSTOMERS)
        .then(resultGet => {
            if(resultGet[0].id > 0)
            {
                return true;
            }
            throw new Error("Record Not Found!");
        })
        .then(okay =>{
            return dbManager.updateData(symbols.TABLE_CUSTOMERS, data);
        })
        .then( result => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}