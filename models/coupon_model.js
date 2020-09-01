const dbManager = require('../config/db_manager');
const symbols = require('../config/symbols');
const common = require('../lib/common');


module.exports.couponCreate = function(callback) {

    dbManager.insertData(symbols.TABLE_COUPONS)
        .then( insertId => {
            if(insertId > 0){
                callback(insertId);
            }else{
                callback(false);
            }
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.couponUpdate = function(callback) {

    dbManager.updateData(symbols.TABLE_COUPONS, symbols.REQUEST_DATA)
        .then( okay => {
            callback(true);
        })
        .catch(err=>{
            callback(0);
            //??? log error
        });
}

module.exports.couponRetrieve = function(callback) {

    dbManager.getData('',symbols.TABLE_COUPONS)
        .then( result => {
            if(result){
                callback(result);
            }else{
                callback(false);
            }
        })
        .catch(err=>{
            callback(0);
            //??? log error
        });
}

module.exports.couponDelete = function(callback) {

    dbManager.deleteData(symbols.TABLE_COUPONS,symbols.REQUEST_DATA['id'])
        .then( result => {
            if(result){
                callback(true);
            }else{
                callback(false);
            }
        })
        .catch(err=>{
            callback(0);
            //??? log error
        });
}