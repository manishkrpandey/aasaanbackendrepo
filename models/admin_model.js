const dbManager = require('../config/db_manager');
const symbols = require('../config/symbols');
const common = require('../lib/common');

module.exports.getAdminData = function(admin_id,password,callback) {
    data = symbols.REQUEST_DATA;
    
    callback(true);    
}

module.exports.adminUpdate = function(callback) {
    dbManager.updateData(symbols.TABLE_ADMIN,symbols.REQUEST_DATA)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            console.log(err);
            callback(false);
            //??? log error
        });
}

module.exports.employeeRegister = function(callback) {
    dbManager.insertData(symbols.TABLE_EMPLOYEES)
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

module.exports.saveOtp = function(otp, callback) {
    data = symbols.REQUEST_DATA;
    data['otp'] = otp;
    dbManager.getData('',symbols.TABLE_ADMIN)
        .then(resultGet => {
            if(resultGet[0].id > 0)
            {
                return true;
            }
            throw new Error("Record Not Found!");
        })
        .then(okay =>{
            return dbManager.updateData(symbols.TABLE_ADMIN, data);
        })
        .then( result => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}