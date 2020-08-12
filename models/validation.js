const dbManager = require('../config/db_manager');
const symbols = require('../config/symbols');
const common = require('../lib/common');
const emplyeeModel = require('./employee_model');
const adminModel = require('./admin_model');

module.exports.isAdmin = function(callback) {
    var data = symbols.REQUEST_DATA;
    //??? uncommenct below , it is with time restriction
    //var sql = "SELECT * FROM "+ symbols.TABLE_ADMIN+" WHERE remember_token = '"+ data['remember_token'] + "' AND updated_on  > (NOW() - INTERVAL 30 MINUTE)";
    if(data['remember_token'] == false){
        callback(false);
    }else{

        var sql = "SELECT * FROM "+ symbols.TABLE_ADMIN+" WHERE remember_token = '"+ data['remember_token'] + "'";
        dbManager.getData(sql)
            .then( result => {
                //??? check if array is not empty
                callback(true);
            })
            .catch(err=>{
                callback(false);
                //??? log error
            });
    }
}

module.exports.isAgent = function(callback) {
    var data = symbols.REQUEST_DATA;
    //??? uncommenct below , it is with time restriction
    //var sql = "SELECT * FROM "+ symbols.TABLE_ADMIN+" WHERE remember_token = '"+ data['remember_token'] + "' AND updated_on  > (NOW() - INTERVAL 30 MINUTE)";
    if(data['remember_token'] == false){
        callback(false);
    }else{

        var sql = "SELECT * FROM "+ symbols.TABLE_EMPLOYEES+" WHERE remember_token = '"+ data['remember_token'] + "' and employee_type_id = "+symbols.EMPLOYEE_TYPE_AGENT;
        dbManager.getData(sql)
            .then( result => {
                //??? check if array is not empty
                callback(true);
            })
            .catch(err=>{
                callback(false);
                //??? log error
            });
    }
}

module.exports.isDeliveryBoy = function(callback) {
    var data = symbols.REQUEST_DATA;
    //??? uncommenct below , it is with time restriction
    //var sql = "SELECT * FROM "+ symbols.TABLE_ADMIN+" WHERE remember_token = '"+ data['remember_token'] + "' AND updated_on  > (NOW() - INTERVAL 30 MINUTE)";
    if(data['remember_token'] == false){
        callback(false);
    }else{

        var sql = "SELECT * FROM "+ symbols.TABLE_EMPLOYEES+" WHERE remember_token = '"+ data['remember_token'] + "' and employee_type_id = "+symbols.EMPLOYEE_TYPE_DELIVERY_BOY;
        dbManager.getData(sql)
            .then( result => {
                //??? check if array is not empty
                callback(true);
            })
            .catch(err=>{
                callback(false);
                //??? log error
            });
    }
}

module.exports.isCustomer = function(callback) {
    var data = symbols.REQUEST_DATA;
    //??? uncommenct below , it is with time restriction
    //var sql = "SELECT * FROM "+ symbols.TABLE_CUSTOMERS+" WHERE remember_token = '"+ data['remember_token'] + "' AND updated_on  > (NOW() - INTERVAL 30 MINUTE)";
    if(data['remember_token'] == false){
        callback(false);
    }else{
        var sql = "SELECT * FROM "+ symbols.TABLE_CUSTOMERS+" WHERE remember_token = '"+ data['remember_token'] + "'";
        dbManager.getData(sql)
            .then( result => {
                //??? check if array is not empty
                callback(true);
            })
            .catch(err=>{
                callback(false);
                //??? log error
            });
    }
}

module.exports.isRegisteredEmployee = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_EMPLOYEE_REGISTER+" WHERE mobile_number = '"+ data['mobile_number'] + "' AND employee_type_id = '"+ data['employee_type_id'] + "'";
    dbManager.getData(sql)
        .then( result => {
            callback(true,result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.isVerifiedCustomer = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_CUSTOMERS +" WHERE mobile_number = '"+ data['mobile_number'] + "' AND is_verified = true;";
    dbManager.getData(sql)
        .then( result => {
            callback(true,result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.isCustomerExist = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_CUSTOMERS +" WHERE mobile_number = '"+ data['mobile_number'] + "'";
    dbManager.getData(sql)
        .then( result => {
            callback(true,result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.verifyOtp = function(accessFlag = symbols.FLAG_AGENT, callback) {
    data = symbols.REQUEST_DATA;
    var sql = "";
    if(accessFlag == symbols.FLAG_AGENT){
        //var sql = "SELECT * FROM "+ symbols.TABLE_EMPLOYEE_REGISTER+" WHERE mobile_number = '"+ data['mobile_number'] + "' AND employee_type_id = '"+ data['employee_type_id'] + "' AND updated_on  > (NOW() - INTERVAL 10 MINUTE)";
        //??? uncomment above line with time check
        var sql = "SELECT * FROM "+ symbols.TABLE_EMPLOYEE_REGISTER+" WHERE mobile_number = '"+ data['mobile_number'] + "' AND employee_type_id = '"+ data['employee_type_id'] + "'";
    }else if(accessFlag == symbols.FLAG_CUSTOMER){
        var sql = "SELECT * FROM "+ symbols.TABLE_CUSTOMERS+" WHERE mobile_number = '"+ data['mobile_number'] + "'";
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