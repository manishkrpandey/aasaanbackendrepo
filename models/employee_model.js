const dbManager = require('../config/db_manager');
const symbols = require('../config/symbols');
const common = require('../lib/common');

module.exports.employeeCreate = function(callback) {
    //??? have to use transaction here
    dbManager.insertData(symbols.TABLE_EMPLOYEES)
        .then( insertId => {
            if(insertId > 0){
                var data = {};
                data['mobile_number'] = symbols.REQUEST_DATA['mobile_number'];
                data['is_signed_up'] = true;
                dbManager.updateData(symbols.TABLE_EMPLOYEE_REGISTER, data)
                    .then( success => {
                        console.log()
                        if(symbols.REQUEST_DATA['employee_type_id'] == symbols.EMPLOYEE_TYPE_DELIVERY_BOY){
                            var deliverBoyData = {};
                            deliverBoyData['employee_id'] = insertId;
                            dbManager.insertData(symbols.TABLE_EMPLOYEE_TRACK, deliverBoyData)
                                .then( succuss => {
                                    dbManager.insertData(symbols.TABLE_AVAILABILITY, deliverBoyData)
                                        .then( succuss => {
                                            callback(insertId);
                                        })
                                        .catch(err=>{
                                            console.log(err);
                                            callback(insertId);
                                            //??? log error - availability not  empoyee - id
                                        });
                                })
                                .catch(err=>{
                                    console.log(err);
                                    callback(insertId);
                                    //??? log error - track not updated ofr empoyee - id
                                });
                        }else {
                            callback(insertId);
                        }
                    })
                    .catch(err=>{
                        callback(insertId);
                        //??? log error - signupflag not updated while employee signed up
                    });
            }else{
                callback(0);
            }
        })
        .catch(err=>{
            callback(0);
            //??? log error
        });
}

module.exports.login = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "select * from " + symbols.TABLE_EMPLOYEES + " where mobile_number = '" + data['mobile_number'] + "' and "+
                " password = '" + data['password'] +"'";
    dbManager.getData(sql)
        .then( result => {
            var remember_token = "new_token";//code to generate
            dbManager.updateData(symbols.TABLE_EMPLOYEES, {"remember_token":remember_token,"id":result[0].id})
                .then( success => {
                    callback(true,remember_token);
                })
                .catch(err=>{
                    console.log(err);
                    callback(false);
                    //??? log error
                });
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.employeeRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    dbManager.getData('',symbols.TABLE_EMPLOYEES)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.employeeUpdate = function(callback) 
{
    dbManager.updateData(symbols.TABLE_EMPLOYEES, symbols.REQUEST_DATA)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.employeeAddressCreate = function(callback) {
    dbManager.insertData(symbols.TABLE_EMPLOYEE_ADDRESS)
        .then( insertId => {
            var data = {};
            data['id'] = symbols.REQUEST_DATA['employee_id'];
            data['is_profile_completed'] = true;
            dbManager.updateData(symbols.TABLE_EMPLOYEES, data)
                .then( success => {
                    callback(insertId);
                })
                .catch(err=>{
                    callback(insertId);
                    //??? log error - profile completed but flag not updated
                });
        })
        .catch(err=>{
            callback(0);
            //??? log error
        });
}

module.exports.employeeAddressRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_EMPLOYEE_ADDRESS+" WHERE employee_id = '"+ data['employee_id']+"'";
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.employeeDocumentCreate = function(callback) {
    dbManager.insertData(symbols.TABLE_EMPLOYEE_DOCUMENTS)
        .then( insertId => {
            callback(insertId);
        })
        .catch(err=>{
            callback(0);
            //??? log error
        });
}

module.exports.employeeDocumentRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_EMPLOYEE_DOCUMENTS+" WHERE employee_id = '"+ data['employee_id']+"'";
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.employeeDocumentUpdate = function(callback) 
{
    symbols.REQUEST_DATA['is_verified'] = false;
    dbManager.updateData(symbols.TABLE_EMPLOYEE_DOCUMENTS, symbols.REQUEST_DATA)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.employeeDocumentDelete = function(callback) {
    symbols.REQUEST_DATA['is_verified'] = false;
    dbManager.deleteData(symbols.TABLE_EMPLOYEE_DOCUMENTS, symbols.REQUEST_DATA['id'])
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.employeeAddressUpdate = function(callback) {
    symbols.REQUEST_DATA['is_verified'] = false;
    dbManager.updateData(symbols.TABLE_EMPLOYEE_ADDRESS, symbols.REQUEST_DATA)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.employeeAddressDelete = function(callback) {
    symbols.REQUEST_DATA['is_verified'] = false;
    dbManager.deleteData(symbols.TABLE_EMPLOYEE_ADDRESS, symbols.REQUEST_DATA['id'])
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            console.log(err);
            callback(false);
            //??? log error
        });
}

module.exports.availabilityUpdate = function(data, callback) {
    if(data == null){
        data = symbols.REQUEST_DATA;
    }
    dbManager.updateData(symbols.TABLE_AVAILABILITY, data)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.trackUpdate = function(callback) {
    data = symbols.REQUEST_DATA;
    dbManager.updateData(symbols.TABLE_EMPLOYEE_TRACK, data)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.employeeTypeRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_EMPLOYEE_TYPES;
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}
//
module.exports.employeeJobTypeRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_EMPLOYEE_JOB_TYPES;
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.employeeSlotRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_EMPLOYEE_SLOTS;
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.documentTypeRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_DOCUMENT_TYPES;
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.saveOtp = function(otp, callback) {
    data = symbols.REQUEST_DATA;
    data['otp'] = otp;
    dbManager.getData('',symbols.TABLE_EMPLOYEES)
        .then(resultGet => {
            console.log(resultGet);
            if(resultGet[0].id > 0)
            {
                return true;
            }
            throw new Error("Record Not Found!");
        })
        .then(okay =>{
            return dbManager.updateData(symbols.TABLE_EMPLOYEES, data);
        })
        .then( result => {
            callback(true);
        })
        .catch(err=>{
            console.log(err);
            callback(false);
            //??? log error
        });
}
