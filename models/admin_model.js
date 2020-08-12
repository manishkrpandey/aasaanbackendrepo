const dbManager = require('../config/db_manager');
const symbols = require('../config/symbols');
const common = require('../lib/common');

module.exports.getAdminData = function(admin_id,password,callback) {
    data = symbols.REQUEST_DATA;
    
    callback(true);    
}

module.exports.login = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "select * from " + symbols.TABLE_ADMIN + " where user_name = " + dbManager.dbconnection.escape(data['user_name']) + " and "+
                " password = " + dbManager.dbconnection.escape(data['password']) ;
    dbManager.getData(sql)
        .then( result => {
            var remember_token = "new_token";//code to generate

            dbManager.updateData(symbols.TABLE_ADMIN, {"remember_token":remember_token,"id":result[0].id})
                .then( success => {
                    callback(true,remember_token);
                })
                .catch(err=>{
                    callback(false);
                    //??? log error
                });
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.employeeRegister = function(callback) {
    dbManager.insertData(symbols.TABLE_EMPLOYEE_REGISTER)
        .then( insertId => {
            callback(insertId);
        })
        .catch(err=>{
            callback(0);
            //??? log error
        });
}

module.exports.updateEmployeeRegister = function(callback) {
    //??? stop update if isSignup is true
    dbManager.updateData(symbols.TABLE_EMPLOYEE_REGISTER, symbols.REQUEST_DATA)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.retrieveEmployeeRegister = function(callback) {
    data = symbols.REQUEST_DATA;
    console.log("pp");
    var sql = "SELECT * FROM "+ symbols.TABLE_EMPLOYEE_REGISTER + " WHERE 1";
    console.log(sql);
    if(data['id'] != false && data['id'] > 0){
        sql += " AND id = '"+ data['id']+"'";
    }
    dbManager.getData(sql)
        .then( result => {
            callback(true,result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
    });
}

module.exports.deleteEmployeeRegister = function(callback) {
    data = symbols.REQUEST_DATA;
    dbManager.deleteData(symbols.TABLE_EMPLOYEE_REGISTER, data['id'])
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}